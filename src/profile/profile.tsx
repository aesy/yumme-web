import React, { Component, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Summary } from '@/profile/summary';
import { Recipes } from '@/profile/recipes';
import styles from '@/profile/profile.scss';
import { Hero } from '@/profile/hero';
import { Collections } from '@/profile/collections';
import { ViewNavigation } from '@/common/view-navigation';
import { type User, YUMME_CLIENT_TYPE, type YummeClient } from '@/api/yumme-client';

type View = 'Summary' | 'Recipes' | 'Collections';

interface ProfileState {
    user: User | null;
    view: View;
}

interface MatchParams {
    id: string;
}

export class Profile extends Component<any, ProfileState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: any) {
        super(props);

        this.state = {
            user: null,
            view: 'Summary',
        };

        this.handler = this.handler.bind(this);
    }

    public componentDidMount(): void {
        window.scrollTo(0, 0);
        this.refresh();
    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                user: null,
            });

            this.refresh();
        }
    }

    public handler(view: string): void {
        this.setState({
            view: view as View,
        });
    }

    public render(): ReactNode {
        return (
            <div className={ styles.profile }>
                { this.state.user && <Hero user={ this.state.user } /> }

                <ViewNavigation
                    active={ this.state.view }
                    navigations={ ['Summary', 'Recipes', 'Collections'] }
                    handler={ this.handler } />

                { this.state.view === 'Summary' && this.state.user && <Summary user={ this.state.user } /> }

                { this.state.view === 'Recipes' && <Recipes /> }

                { this.state.view === 'Collections' && <Collections /> }
            </div>
        );
    }

    private async refresh(): Promise<void> {
        const userId = Number(this.props.match.params.id);
        const user = await this.yummeClient.getUserById(userId);

        this.setState({
            user,
        });
    }
}
