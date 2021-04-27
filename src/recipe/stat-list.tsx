import React, { Component, ReactNode } from 'react';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/stat-list.scss';
import { StandardHeader } from '@/common/standard-header';
import { EditableText } from '@/common/editable-text';

interface Props {
    cookTime: string;
    editing: boolean;
    prepTime: string;
    yield: string;
}

interface StatListState {
    cookTime: string;
    prepTime: string;
    yield: string;
}

export class StatList extends Component<Props, StatListState> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            cookTime: this.props.cookTime,
            prepTime: this.props.prepTime,
            yield: this.props.yield,
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ styles.stats }>
                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Prep time</h4>
                        </StandardHeader>
                        <div className={ styles.value }>
                            <EditableText
                                tag="span"
                                placeholder=""
                                value={ this.state.prepTime }
                                onChange={ this.editPrepTimeOnChange } />
                            <span className={ styles.unit }>
                                min
                            </span>
                        </div>
                    </li>
                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Cook time</h4>
                        </StandardHeader>
                        <div className={ styles.value }>
                            <EditableText
                                tag="span"
                                placeholder=""
                                value={ this.state.cookTime }
                                onChange={ this.editCookTimeOnChange } />
                            <span className={ styles.unit }>
                                min
                            </span>
                        </div>
                    </li>
                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Yield</h4>
                        </StandardHeader>
                        <div className={ styles.value }>
                            <EditableText
                                tag="span"
                                placeholder=""
                                value={ this.state.yield }
                                onChange={ this.editYieldOnChange } />
                            <span className={ styles.unit }>
                                servings
                            </span>
                        </div>
                    </li>
                </ul>
            );
        }

        return (
                <ul className={ styles.stats }>

                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Prep time</h4>
                        </StandardHeader>
                        <span className={ styles.unit }>
                            {this.state.prepTime}
                            {' '}
                            min
                        </span>
                    </li>

                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Cook time</h4>
                        </StandardHeader>
                        <span className={ styles.unit }>
                            {this.state.cookTime}
                            {' '}
                            min
                        </span>
                    </li>

                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Yield</h4>
                        </StandardHeader>
                        <span className={ styles.unit }>
                            {this.state.yield}
                            {' '}
                            servings
                        </span>
                    </li>

                </ul>
        );
    }

    @Bind
    private editCookTimeOnChange(value: string): void {
        this.setState({
            cookTime: value,
        });
    }

    @Bind
    private editPrepTimeOnChange(value: string): void {
        this.setState({
            prepTime: value,
        });
    }

    @Bind
    private editYieldOnChange(value: string): void {
        this.setState({
            yield: value,
        });
    }
}
