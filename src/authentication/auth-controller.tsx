import React, { type PropsWithChildren, type ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { useInjection } from 'inversify-react';
import { AuthWall } from '@/authentication/auth-wall';
import { AuthState } from '@/authentication/auth-state';
import { accessTokenAtom } from '@/authentication/access-token-atom';
import styles from '@/app.module.scss';

export function AuthController(props: PropsWithChildren): ReactNode {
    // Resolve AuthState for its construction side effects: it installs the auth
    // middleware and triggers refresh-on-mount (auto-login). This wires auth at the
    // app root, so keep it even though the resolved value isn't read here.
    useInjection<AuthState>(AuthState);
    const accessToken = useAtomValue(accessTokenAtom);

    if (!accessToken) {
        return <AuthWall />;
    }

    return <div className={styles.page}>{props.children}</div>;
}
