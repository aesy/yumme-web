import React, { type PropsWithChildren, PureComponent, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import { AuthWall } from '@/authentication/auth-wall';
import { AuthState } from '@/authentication/auth-state';
import styles from '@/app.scss';

@observer
export class AuthController extends PureComponent<PropsWithChildren<unknown>> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    public constructor(props: PropsWithChildren<unknown>) {
        super(props);
    }

    public render(): ReactNode {
        if (!this.authState.isLoggedIn()) {
            return (
                <AuthWall />
            );
        }

        return (
            <div className={ styles.page }>
                { this.props.children }
            </div>
        );
    }
}
