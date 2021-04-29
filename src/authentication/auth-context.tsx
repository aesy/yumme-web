import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterForm } from './register-form';
import { AuthState } from './auth-state';
import { observer } from 'mobx-react';

interface AuthContextProps extends RouteComponentProps<any> {
}

interface AuthContextState {

}

@observer
export class AuthContext extends PureComponent<AuthContextProps, AuthContextState> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    public constructor(props: AuthContextProps) {
        super(props);

        this.state = {

        };
    }

    public render(): ReactNode {
        if (!this.authState.getToken()) {
            return (
                <RegisterForm {...this.props}/>
            )
        }

        return (
            <>
                {this.props.children}
            </>
        );
    }
}
