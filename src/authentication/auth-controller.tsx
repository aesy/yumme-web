import React, { type PropsWithChildren, type ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useInjection } from 'inversify-react';
import { AuthWall } from '@/authentication/auth-wall';
import { AuthState } from '@/authentication/auth-state';
import styles from '@/app.module.scss';

export const AuthController = observer(function AuthController(props: PropsWithChildren<unknown>): ReactNode {
    const authState = useInjection<AuthState>(AuthState);

    if (!authState.isLoggedIn()) {
        return (
            <AuthWall />
        );
    }

    return (
        <div className={ styles.page }>
            { props.children }
        </div>
    );
});
