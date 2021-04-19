import React, { FC } from 'react';
import styles from '@/common/view-navigation.scss';

type Handler = (arg: string) => void;

interface ViewNavigationProps {
    readonly active: string;
    readonly handler: Handler;
    readonly navigations: string[];
}

export const ViewNavigation: FC<ViewNavigationProps> = props => (
    <ul className={ styles.viewNavigation }>
        {
            props.navigations.map(navigation => (
                <li key={ navigation }
                    className={ props.active === navigation ? styles.active : '' }
                    onClick={ (): void => {
                        props.handler(navigation);
                    } }>
                    { navigation }
                </li>
            ))
        }
    </ul>
);
