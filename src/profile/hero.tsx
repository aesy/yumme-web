import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/profile/hero.scss';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import DefaultHeroImage from '@/images/DefaultHeroImage.jpg';
import { StandardBtn } from '@/common/standard-btn';
import { User, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface HeroState {
    currentUser?: User;
}

interface HeroProps {
    id: string;
}

@observer
export class Hero extends Component<HeroProps, HeroState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: HeroProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount(): void {
        this.refresh();
    }

    public render(): ReactNode {
        return (
            <section className={ styles.hero }>
                <div className={ styles.content }>
                    <div className={ styles.wrapper }>
                        <img className={ styles.profileImg } src={ DefaultProfileImage } />
                        <div className={ styles.details }>
                            <h1>{ this.state.currentUser?.display_name }</h1>
                            <ul className={ styles.stats }>
                                <li>
                                    <span className={ styles.highlighted }>33</span>
                                    { ' ' }
                                    <span>recipes</span>
                                </li>
                                <li>
                                    <span className={ styles.highlighted }>5</span>
                                    { ' ' }
                                    <span>collections</span>
                                </li>
                                <li>
                                    <span className={ styles.highlighted }>4.3</span>
                                    { ' ' }
                                    <span>stars on average</span>
                                </li>
                            </ul>
                            <StandardBtn type="button">Follow</StandardBtn>
                        </div>
                    </div>
                    <div className={ styles.bg }
                         style={{ backgroundImage: `url(${ DefaultHeroImage })` }} />
                </div>
            </section>
        );
    }

    @Bind
    private async refresh(): Promise<void> {
        const currentUser = await this.yummeClient.getCurrentUser();

        this.setState({
            currentUser,
        });
    }
}
