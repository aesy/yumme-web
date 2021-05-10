import React, { FC } from 'react';
import styles from '@/profile/hero.scss';
import { StandardBtn } from '@/common/standard-btn';

export const Hero: FC = () => (
    <section className={ styles.hero }>
        <div className={ styles.content }>
            <div className={ styles.wrapper }>
                <img className={ styles.profileImg } src="https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg" />
                <div className={ styles.details }>
                    <h1>Emil Wertwein</h1>
                    <ul className={ styles.stats }>
                        <li>
                            <span className={ styles.highlighted }>33</span>
                            {' '}
                            <span>recipes</span>
                        </li>
                        <li>
                            <span className={ styles.highlighted }>5</span>
                            {' '}
                            <span>collections</span>
                        </li>
                        <li>
                            <span className={ styles.highlighted }>4.3</span>
                            {' '}
                            <span>stars on average</span>
                        </li>
                    </ul>
                    <StandardBtn type="button">Follow Emil</StandardBtn>
                </div>
            </div>
            <div className={ styles.bg }
                 style={{ backgroundImage: 'url(https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg)' }} />
        </div>
    </section>
);
