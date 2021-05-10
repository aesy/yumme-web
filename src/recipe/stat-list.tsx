import React, { PureComponent, ReactNode } from 'react';
import styles from '@/recipe/stat-list.scss';
import { StandardHeader } from '@/common/standard-header';

interface Stat {
    type: string;
    value: string;
}

interface Props {
    stats: Stat[];
}

export class StatList extends PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <ul className={ styles.stats }>
                {
                    this.props.stats
                        .map((stat, i) => (
                            <li key={ i } className={ styles.stat }>
                                <div>
                                    <StandardHeader borderOffset="small" color="white"><h4>{ stat.type }</h4></StandardHeader>
                                    <span>{ stat.value }</span>
                                </div>
                            </li>
                        ))
                }
            </ul>
        );
    }
}
