import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/registration/registration-form.scss';
import { StandardInput } from '@/common/standard-input';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { AuthState } from '@/authentication/auth-state';
import { YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface RegistrationFormState {
    email: string;
    error: string | null;
    firstName: string;
    lastName: string;
    loading: boolean;
    password: string;
}

export class RegistrationForm extends PureComponent<unknown, RegistrationFormState> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
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
                        value={ this.state.firstName }
                        label="First name"
                        minLength={ 1 }
                        maxLength={ 64 }
                        type="text"
                        placeholder="John"
                        name="firstName"
                        required
                        onChange={ this.onChange } />
                    <StandardInput
                        value={ this.state.lastName }
                        label="Last name"
                        minLength={ 1 }
                        maxLength={ 64 }
                        type="text"
                        placeholder="Doe"
                        name="lastName"
                        required
                        onChange={ this.onChange } />
                    <StandardInput
                        value={ this.state.email }
                        label="E-mail"
                        minLength={ 4 }
                        maxLength={ 128 }
                        type="text"
                        placeholder="john@doe.com"
                        name="email"
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

        const request = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };

        this.setState({
            loading: true,
        });

        try {
            const response = await this.yummeClient.register(request);
            this.authState.logInWithEmailAndPassword(response);
        } catch (err: any) {
            this.setState({
                loading: false,
                error: err,
            });
        }
    }
}
