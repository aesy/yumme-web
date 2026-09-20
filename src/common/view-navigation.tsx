import React, { FC } from 'react';
import styles from '@/common/view-navigation.module.scss';

interface ViewNavigationProps {
    readonly active: string;
    readonly navigations: string[];

    handler(arg: string): void;
}

export const ViewNavigation: FC<ViewNavigationProps> = (props) => (
    <ul className={styles.viewNavigation}>
        {props.navigations.map((navigation) => (
            <li
                key={navigation}
                className={props.active === navigation ? styles.active : ''}
                role="tab"
                tabIndex={0}
                onClick={(): void => {
                    props.handler(navigation);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>): void => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        props.handler(navigation);
                    }
                }}
            >
                {navigation}
            </li>
        ))}
    </ul>
);
