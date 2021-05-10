import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/registration/registration-form.scss';
import { StandardInput } from '@/common/standard-input';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { AuthState } from '@/authentication/auth-state';
import { YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface LoginFormState {
    error: string | null;
    loading: boolean;
    password: string;
    username: string;
}

export class LoginForm extends PureComponent<unknown, LoginFormState> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            error: null,
        };
    }

    public render(): ReactNode {
        return (
            <>
                {
                    this.state.error !== null &&
                        <span className={ styles.err }>{this.state.error}</span>

                }

                {
                    this.state.loading && (
                        <div className={ styles.loadingWrapper }>
                            <LoadingSpinner />
                        </div>
                    )
                }

                <form className={ styles.registrationForm } onSubmit={ this.onSubmit }>
                    <StandardInput
                        value={ this.state.username }
                        label="E-mail"
                        type="email"
                        placeholder="john@doe.com"
                        name="username"
                        required
                        onChange={ this.onChange } />
                    <StandardInput
                        value={ this.state.password }
                        label="Password"
                        type="password"
                        placeholder="********"
                        name="password"
                        required
                        onChange={ this.onChange } />
                    <StandardBtn type="submit">LOG IN</StandardBtn>
                </form>
            </>
        );
    }

    @Bind
    private onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        } as unknown as LoginFormState);
    }

    @Bind
    private async onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const request = {
            username: this.state.username,
            password: this.state.password,
            grantType: 'password' as const,
        };

        this.setState({
            loading: true,
        });

        try {
            const response = await this.yummeClient.getAccessToken(request);
            this.authState.logInWithEmailAndPassword(response);
        } catch (err: any) {
            this.setState({
                loading: false,
                error: err,
            });
        }
    }
}
