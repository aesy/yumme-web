import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import { StandardBtn } from '@/common/standard-btn';
import { YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { RouteComponentProps } from 'react-router-dom';
import { AuthState } from './auth-state';

interface RegisterFormProps extends RouteComponentProps<any> {
}

interface RegisterFormState {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    error?: string;
}

export class RegisterForm extends PureComponent<RegisterFormProps, RegisterFormState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    @resolve(AuthState)
    private readonly authState: AuthState;

    public constructor(props: RegisterFormProps) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        };
    }

    public render(): ReactNode {
        if (this.state.error) {
            return <span>{this.state.error}</span>;
        }

        return (
                <form onChange={ this.onChange }>
                    <input type="email" placeholder="First name" name="firstName" />
                    <input type="text" placeholder="Lastname" name="lastName" />
                    <input type="text" placeholder="Email address" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <StandardBtn onClick={this.onSubmit}>Register!</StandardBtn>
                </form>
        );
    }

    @Bind
    private onChange(e: React.ChangeEvent<HTMLFormElement>) {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        } as Pick<RegisterFormState, keyof RegisterFormState>);
    }

    @Bind
    private onSubmit(e: React.FormEvent<HTMLFormElement>) {
        this.yummeClient.register(this.state).then(token => {
            this.authState.setToken(token.accessToken);
        }).catch(err => {
            this.setState({
                error: err,
            });
        });
    }
}
