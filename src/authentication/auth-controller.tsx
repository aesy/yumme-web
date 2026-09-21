import React, { type PropsWithChildren, type ReactNode, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useInjection } from 'inversify-react';
import { LoadingSpinner } from '@/common/loading-spinner';
import { SessionStore } from '@/authentication/session-store';
import { sessionAtom } from '@/authentication/session';
import { AuthWall } from '@/authentication/auth-wall';
import styles from '@/app.module.scss';

export function AuthController(props: PropsWithChildren): ReactNode {
    const sessionStore = useInjection<SessionStore>(SessionStore);
    const session = useAtomValue(sessionAtom);

    useEffect(() => {
        sessionStore.restore();
    }, [sessionStore]);

    if (session.status === 'restoring') {
        return (
            <div className={styles.sessionLoading}>
                <LoadingSpinner color="orange" />
            </div>
        );
    }

    if (session.status === 'anonymous') {
        return <AuthWall />;
    }

    return <div className={styles.page}>{props.children}</div>;
}
