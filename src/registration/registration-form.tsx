import React, { ReactNode, useState } from 'react';
import { useInjection } from 'inversify-react';
import styles from '@/registration/registration-form.module.scss';
import { StandardInput } from '@/common/standard-input';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { SessionStore } from '@/authentication/session-store';
import { YUMME_CLIENT_TYPE, type YummeClient, type AuthError } from '@/api/yumme-client';

export function RegistrationForm(): ReactNode {
    const sessionStore = useInjection<SessionStore>(SessionStore);
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);

    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        if (name === 'displayName') {
            setDisplayName(value);
        } else if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setLoading(true);

        try {
            await yummeClient.register({
                user_name: username,
                display_name: displayName,
                password,
            });
        } catch (err: unknown) {
            setLoading(false);
            setError(String(err));
        }

        try {
            const response = await yummeClient.getAccessToken({
                username,
                password,
                grant_type: 'password' as const,
            });

            sessionStore.login(response);
        } catch (err: unknown) {
            setLoading(false);
            setError((err as AuthError).error_description ?? null);
        }
    };

    return (
        <>
            {error !== null && <span className={styles.err}>{error}</span>}

            {loading && (
                <div className={styles.loadingWrapper}>
                    <LoadingSpinner color="orange" />
                </div>
            )}

            <form
                className={styles.registrationForm}
                onSubmit={(e) => {
                    void onSubmit(e);
                }}
            >
                <StandardInput
                    value={displayName}
                    label="Display name"
                    minLength={1}
                    maxLength={64}
                    type="text"
                    placeholder="John Doe"
                    name="displayName"
                    required
                    onChange={onChange}
                />
                <StandardInput
                    value={username}
                    label="Username"
                    minLength={4}
                    maxLength={64}
                    type="text"
                    placeholder="epicjohn1337"
                    name="username"
                    required
                    onChange={onChange}
                />
                <StandardInput
                    value={password}
                    label="Password"
                    minLength={8}
                    maxLength={128}
                    type="password"
                    placeholder="********"
                    name="password"
                    required
                    onChange={onChange}
                />
                <StandardBtn type="submit">CREATE ACCOUNT</StandardBtn>
            </form>
        </>
    );
}
