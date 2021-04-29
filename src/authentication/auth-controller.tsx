import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { AuthState } from './auth-state';
import { observer } from 'mobx-react';
import { Registration } from '@/registration/registration';

interface AuthControllerState {

}

@observer
export class AuthController extends PureComponent<unknown, AuthControllerState> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    public constructor(props: unknown) {
        super(props);
    }

    public componentDidMount(): void {

    }

    public render(): ReactNode {
        if (!this.authState.getToken()) {
            return (
                <Registration />
            )
        }

        return (
            <>
                {this.props.children}
            </>
        );
    }
}
