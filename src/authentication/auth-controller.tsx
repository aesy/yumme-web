import React, { PureComponent, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import styles from '@/app.scss';
import { AuthWall } from './auth-wall';
import { AuthState } from './auth-state';

@observer
export class AuthController extends PureComponent<unknown> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    public constructor(props: unknown) {
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
