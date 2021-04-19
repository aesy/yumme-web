import React, { PureComponent, ReactNode } from 'react';
import { EmptyProps } from '@/utils/react';
import { Summary } from '@/profile/summary';
import { Recipes } from '@/profile/recipes';
import styles from '@/profile/profile.scss';
import { Hero } from '@/profile/hero';
import { Collections } from '@/profile/collections';
import { ViewNavigation } from '@/common/view-navigation';

interface IState {
    view: 'Summary' | 'Recipes' | 'Collections';
}

export class Profile extends PureComponent<EmptyProps, IState> {
    public constructor(props: EmptyProps) {
        super(props);

        this.state = {
            view: 'Summary',
        };

        this.handler = this.handler.bind(this);
    }

    public handler(view: 'Summary' | 'Recipes' | 'Collections'): void {
        this.setState({
            view,
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
