import React, { FC } from 'react';
import styles from '@/profile/hero.scss';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import DefaultHeroImage from '@/images/DefaultHeroImage.jpg';
import { StandardBtn } from '@/common/standard-btn';
import { User } from '@/api/yumme-client';

interface HeroProps {
    user: User;
}

export const Hero: FC<HeroProps> = props => (
    <section className={ styles.hero }>
        <div className={ styles.content }>
            <div className={ styles.wrapper }>
                <img className={ styles.profileImg } src={ DefaultProfileImage } />
                <div className={ styles.details }>
                    <h1>{ props.user.display_name }</h1>
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
