import React, { ReactNode, PureComponent } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/registration/registration-form.scss';
import { StandardInput } from '@/common/standard-input';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { AuthState } from '@/authentication/auth-state';
import { YUMME_CLIENT_TYPE, type YummeClient, type AuthError } from '@/api/yumme-client';

interface RegistrationFormState {
    displayName: string;
    error: string | null;
    loading: boolean;
    password: string;
    username: string;
}

export class RegistrationForm extends PureComponent<unknown, RegistrationFormState> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            username: '',
            displayName: '',
            password: '',
            loading: false,
            error: null,
        };
    }

    public render(): ReactNode {
        return (
            <>
                {
                    this.state.error !== null && (
                        <span className={ styles.err }>
                            { this.state.error }
                        </span>
                    )
                }

                {
                    this.state.loading && (
                        <div className={ styles.loadingWrapper }>
                            <LoadingSpinner color="orange" />
                        </div>
                    )
                }

                <form className={ styles.registrationForm } onSubmit={ this.onSubmit }>
                    <StandardInput
                        value={ this.state.displayName }
                        label="Display name"
                        minLength={ 1 }
                        maxLength={ 64 }
                        type="text"
                        placeholder="John Doe"
                        name="displayName"
                        required
                        onChange={ this.onChange } />
                    <StandardInput
                        value={ this.state.username }
                        label="Username"
                        minLength={ 4 }
                        maxLength={ 64 }
                        type="text"
                        placeholder="epicjohn1337"
                        name="username"
                        required
                        onChange={ this.onChange } />
                    <StandardInput
                        value={ this.state.password }
                        label="Password"
                        minLength={ 8 }
                        maxLength={ 128 }
                        type="password"
                        placeholder="********"
                        name="password"
                        required
                        onChange={ this.onChange } />
                    <StandardBtn type="submit">CREATE ACCOUNT</StandardBtn>
                </form>
            </>
        );
    }

    @Bind
    private onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        } as unknown as RegistrationFormState);
    }

    @Bind
    private async onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        try {
            await this.yummeClient.register({
                // eslint-disable-next-line
                user_name: this.state.username,
                // eslint-disable-next-line
                display_name: this.state.displayName,
                password: this.state.password,
            });
        } catch (err: unknown) {
            this.setState({
                loading: false,
                error: String(err),
            });
        }

        try {
            const response = await this.yummeClient.getAccessToken({
                username: this.state.username,
                password: this.state.password,
                // eslint-disable-next-line
                grant_type: 'password' as const,
            });

            this.authState.logInWithEmailAndPassword(response);
        } catch (err: unknown) {
            this.setState({
                loading: false,
                error: (err as AuthError).error_description,
            });
        }
    }
}
