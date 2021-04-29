import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import { StandardBtn } from '@/common/standard-btn';
import { YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { AuthState } from '@/authentication/auth-state';
import styles from '@/registration/registration-form.scss';
import { StandardInput } from '@/common/standard-input';

interface RegistrationFormState {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    error?: string;
    loading: boolean;
}

export class RegistrationForm extends PureComponent<unknown, RegistrationFormState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    @resolve(AuthState)
    private readonly authState: AuthState;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            loading: false
        };
    }

    public render(): ReactNode {
        if (this.state.error) {
            return <span>{this.state.error}</span>;
        }

        return (
            <form className={styles.registrationForm} onChange={this.onChange} onSubmit={this.onSubmit}>
                <StandardInput label='First name' minLength={1} type="text" placeholder="John" name="firstName" />
                <StandardInput label='Last name' minLength={1} type="text" placeholder="Doe" name="lastName" />
                <StandardInput label='E-mail' type="text" placeholder="Abc@abc.com" name="email" />
                <StandardInput label='Password' minLength={8} type="password" placeholder="Min length is 8" name="password" />
                <StandardBtn type='submit'>CREATE ACCOUNT</StandardBtn>
            </form>
        );
    }

    @Bind
    private onChange(e: React.ChangeEvent<HTMLFormElement>) {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        } as Pick<RegistrationFormState, keyof RegistrationFormState>);
    }

    @Bind
    private onSubmit(e: React.FormEvent<HTMLFormElement>) {
        this.setState({
            loading: true
        });
        this.yummeClient.register(this.state).then(token => {
            this.authState.setToken(token.accessToken);
        }).catch(err => {
            this.setState({
                loading: false,
                error: err,
            });
        });
    }
}
