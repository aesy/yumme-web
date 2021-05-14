import React, { PureComponent, ReactNode } from 'react';
import { Bind } from '@decorize/bind';
import { RegistrationForm } from '@/registration/registration-form';
import { LoginForm } from '@/login/login-form';
import { ViewNavigation } from '@/common/view-navigation';
import { StaticCard } from '@/common/static-card';
import styles from '@/authentication/auth-wall.scss';

type View = 'Sign up' | 'Log in';

interface AuthWallState {
    view: View;
}

export class AuthWall extends PureComponent<unknown, AuthWallState> {
    public constructor(props: unknown) {
        super(props);

        this.state = {
            view: 'Sign up',
        };
    }

    @Bind
    public handler(view: string): void {
        this.setState({
            view: view as View,
        });
    }

    public render(): ReactNode {
        return (
            <div className={ styles.authWall }>
                <StaticCard color="white" borderOffset="large">
                    <div className={ styles.wrapper }>
                        <div className={ styles.nav }>
                            <ViewNavigation
                                active={ this.state.view }
                                navigations={ ['Sign up', 'Log in'] }
                                handler={ this.handler } />
                        </div>
                        { this.state.view === 'Sign up' && <RegistrationForm /> }
                        { this.state.view === 'Log in' && <LoginForm /> }
                    </div>
                </StaticCard>
            </div>
        );
    }
}
