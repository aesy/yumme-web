import React, { Component, ReactNode } from 'react';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/stat-list.scss';
import { StandardHeader } from '@/common/standard-header';
import { Recipe } from '@/api/yumme-client';

interface StatListProps {
    editing: boolean;
    recipe: Recipe;
    type: 'row' | 'column';
    updateRecipe(recipe: Recipe): void;
}

export class StatList extends Component<StatListProps, unknown> {
    public constructor(props: StatListProps) {
        super(props);
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ `${ styles.stats } ${ styles[this.props.type] }` }>
                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Prep time</h4>
                        </StandardHeader>
                        <div className={ styles.inputWrapper }>
                            <input type="number" min={ 1 } max={ 240 } value={ Math.round(this.props.recipe.prep_time / 60) } onChange={ this.editPrepTime } />
                        </div>
                        <span className={ styles.unit }>
                            min
                        </span>
                    </li>
                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Cook time</h4>
                        </StandardHeader>
                        <div className={ styles.inputWrapper }>
                            <input type="number" min={ 1 } max={ 240 } value={ Math.round(this.props.recipe.cook_time / 60) } onChange={ this.editCookTime } />
                        </div>
                        <span className={ styles.unit }>
                            min
                        </span>
                    </li>
                    <li className={ styles.stat }>
                        <StandardHeader borderOffset="small" color="white">
                            <h4>Yield</h4>
                        </StandardHeader>
                        <div className={ styles.inputWrapper }>
                            <input type="number" min={ 1 } max={ 12 } value={ this.props.recipe.yield } onChange={ this.editYield } />
                        </div>
                        <span className={ styles.unit }>
                            servings
                        </span>
                    </li>
                </ul>
            );
        }

        return (
            <ul className={ `${ styles.stats } ${ styles[this.props.type] }` }>
                <li className={ styles.stat }>
                    <StandardHeader borderOffset="small" color="white">
                        <h4>Prep time</h4>
                    </StandardHeader>
                    <span className={ styles.value }>
                        { Math.round(this.props.recipe.prep_time / 60) }
                    </span>
                    <span className={ styles.unit }>
                        min
                    </span>
                </li>

                <li className={ styles.stat }>
                    <StandardHeader borderOffset="small" color="white">
                        <h4>Cook time</h4>
                    </StandardHeader>
                    <span className={ styles.value }>
                        { Math.round(this.props.recipe.cook_time / 60) }
                    </span>
                    <span className={ styles.unit }>
                        min
                    </span>
                </li>

                <li className={ styles.stat }>
                    <StandardHeader borderOffset="small" color="white">
                        <h4>Yield</h4>
                    </StandardHeader>
                    <span className={ styles.value }>
                        { this.props.recipe.yield }
                    </span>
                    <span className={ styles.unit }>
                        servings
                    </span>
                </li>
            </ul>
        );
    }

    @Bind
    private editCookTime(ev: React.ChangeEvent<HTMLInputElement>): void {
        const recipe = this.props.recipe;
        const value = ev.target.value;
        // eslint-disable-next-line
        recipe.cook_time = Number(value) * 60;

        this.props.updateRecipe(recipe);
    }

    @Bind
    private editPrepTime(ev: React.ChangeEvent<HTMLInputElement>): void {
        const recipe = this.props.recipe;
        const value = ev.target.value;
        // eslint-disable-next-line
        recipe.prep_time = Number(value) * 60;

        this.props.updateRecipe(recipe);
    }

    @Bind
    private editYield(ev: React.ChangeEvent<HTMLInputElement>): void {
        const recipe = this.props.recipe;
        const value = ev.target.value;
        recipe.yield = Number(value);

        this.props.updateRecipe(recipe);
    }
}
