import React, { PureComponent, ReactNode } from 'react';
import { Summary } from '@/profile/summary';
import { Recipes } from '@/profile/recipes';
import styles from '@/profile/profile.scss';
import { Hero } from '@/profile/hero';
import { Collections } from '@/profile/collections';
import { ViewNavigation } from '@/common/view-navigation';

type View = 'Summary' | 'Recipes' | 'Collections';

interface ProfileState {
    view: View;
}

export class Profile extends PureComponent<unknown, ProfileState> {
    public constructor(props: unknown) {
        super(props);

        this.state = {
            view: 'Summary',
        };

        this.handler = this.handler.bind(this);
    }

    public handler(view: string): void {
        this.setState({
            view: view as View,
        });
    }

    public render(): ReactNode {
        return (
            <div className={ styles.profile }>
                <Hero />
                <ViewNavigation active={ this.state.view } navigations={ ['Summary', 'Recipes', 'Collections'] } handler={ this.handler } />

                { this.state.view === 'Summary' && <Summary /> }

                { this.state.view === 'Recipes' && <Recipes /> }

                { this.state.view === 'Collections' && <Collections /> }
            </div>
        );
    }
}
