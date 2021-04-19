import React, { FC } from 'react';
import styles from '@/profile/hero.scss';
import { StandardBtn } from '@/common/standard-btn';
import defaultStyles from '@/common/default.scss';
import { Bordered } from '@/common/bordered';

export const Hero: FC = props => (
    <section className={ styles.hero }>
        <div className={ styles.content }>
            <div className={ styles.wrapper }>
                <div className={ styles.picture }>
                    <Bordered round size="large">
                        <img className={ styles.profile } src="https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg" />
                    </Bordered>
                </div>
                <div className={ styles.details }>
                    <h1>Emil Wertwein</h1>
                    <div className={ styles.stats }>
                        <span>
                            <span className={ defaultStyles.highlighted }>33</span>
                            {' '}
                            recipes
                        </span>
                        <span>
                            <span className={ defaultStyles.highlighted }>5</span>
                            {' '}
                            collections
                        </span>
                        <span>
                            <span className={ defaultStyles.highlighted }>4.3</span>
                            {' '}
                            stars on average
                        </span>
                    </div>
                    <StandardBtn>Follow Emil</StandardBtn>
                </div>
            </div>
            <div className={ styles.bg } style={{ backgroundImage: 'url(https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg)' }}> </div>
        </div>
    </section>
);
