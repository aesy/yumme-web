import React, { Component, ReactNode } from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/ingredient-list.scss';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.scss';
import { Recipe } from '@/api/yumme-client';

interface IngredientListProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

interface IngredientListState {
    addIngredientInputErrors: string[];
    addIngredientInputValue: string;
    selectedInput: number | null;
    selectedInputErrors: string[];
    selectedInputValue: string;
}

export class IngredientList extends Component<IngredientListProps, IngredientListState> {
    public constructor(props: IngredientListProps) {
        super(props);

        this.state = {
            selectedInput: null,
            selectedInputValue: '',
            selectedInputErrors: [],
            addIngredientInputValue: '',
            addIngredientInputErrors: [],
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ styles.ingredients }>
                    {
                        this.props.recipe.ingredients
                            .map((ingredient, i) => this.state.selectedInput === i
                                ? (
                                    <li
                                        key={ i }
                                        className={ `${ styles.ingredient } ${ styles.editing }` }>
                                        <EditableText
                                            tag="p"
                                            value={ this.state.selectedInputValue }
                                            placeholder=""
                                            errors={ this.state.selectedInputErrors }
                                            onKeyDownEnter={ this.deselectInput }
                                            onChange={ this.editOnChange } />
                                        <div className={ editStyles.editButtons }>
                                            <DeleteSharpIcon
                                                className={ editStyles.delete }
                                                onClick={ (): void => this.delete(i) } />
                                        </div>
                                    </li>
                                )
                                : (
                                    <li
                                        key={ i }
                                        className={ `${ styles.ingredient } ${ styles.editable }` }
                                        onClick={ (): void => this.selectInput(i) }>
                                        <div className={ styles.item }>
                                            <span className={ styles.dot } />
                                            <p>{ ingredient.name }</p>
                                        </div>
                                        <div className={ editStyles.editButtons }>
                                            <EditSharpIcon className={ editStyles.edit } />
                                        </div>
                                    </li>
                                ))
                    }

                    <li className={ styles.ingredient }>
                        <EditableText
                            tag="p"
                            value={ this.state.addIngredientInputValue }
                            placeholder="Add ingredient"
                            errors={ this.state.addIngredientInputErrors }
                            onKeyDownEnter={ this.tryAdd }
                            onChange={ this.addOnChange } />
                        <div className={ editStyles.editButtons }>
                            <AddCircleSharpIcon
                                className={ editStyles.add }
                                onClick={ this.tryAdd } />
                        </div>
                    </li>
                </ul>
            );
        }

        return (
            this.props.recipe.ingredients.length <= 0
                ? <p>No ingredients added..</p>

                : (
                    <ul className={ styles.ingredients }>
                        {
                            this.props.recipe.ingredients
                                .map((ingredient, i) => (
                                    <li key={ i } className={ styles.ingredient }>
                                        <div className={ styles.item }>
                                            <span className={ styles.dot } />
                                            <p>{ ingredient.name }</p>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                )
        );
    }

    @Bind
    private addOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ addIngredientInputValue: ev.target.value });
    }

    @Bind
    private delete(identifier: number): void {
        const recipe = this.props.recipe;
        recipe.ingredients.splice(identifier, 1);
        this.props.updateRecipe(recipe);

        this.setState({
            selectedInput: null,
        });
    }

    @Bind
    private deselectInput(): void {
        const selectedInput = this.state.selectedInput;

        if (selectedInput === null) {
            return;
        }

        this.trySaveInput(() => {
            this.setState({ selectedInput: null });
        });
    }

    @Bind
    private editOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ selectedInputValue: ev.target.value });
    }

    @Bind
    private selectInput(identifier: number): void {
        const recipe = this.props.recipe;
        const previousSelectedInput = this.state.selectedInput;
        const ingredient = recipe.ingredients[identifier];

        if (previousSelectedInput === null) {
            this.setState({
                selectedInput: identifier,
                selectedInputValue: ingredient.name,
            });
        }

        this.trySaveInput(() => {
            this.setState({
                selectedInput: identifier,
                selectedInputValue: ingredient.name,
            });
        });
    }

    @Bind
    private tryAdd(): void {
        const recipe = this.props.recipe;
        const value = this.state.addIngredientInputValue;
        const addIngredientInputErrors = this.validate(value);

        this.setState({ addIngredientInputErrors });

        if (addIngredientInputErrors.length) {
            return;
        }

        recipe.ingredients.push({
            name: this.state.addIngredientInputValue,
        });
        this.props.updateRecipe(recipe);
        this.setState({ addIngredientInputValue: '' });
    }

    @Bind
    private trySaveInput(callback: () => void): void {
        const recipe = this.props.recipe;
        const selectedInput = this.state.selectedInput;
        const value = this.state.selectedInputValue;
        const selectedInputErrors = this.validate(value);

        if (selectedInput === null) {
            return;
        }

        if (!value) {
            this.delete(selectedInput);

            return;
        }

        this.setState({ selectedInputErrors });

        if (selectedInputErrors.length) {
            return;
        }

        recipe.ingredients[selectedInput] = { name: value };
        this.props.updateRecipe(recipe);
        callback();
    }

    private validate(value: string): string[] {
        const errors: string[] = [];
        const min = 1;
        const max = 200;

        if (value.length < min || value.length > max) {
            errors.push(`Ingredient must be between ${ min } and ${ max } letters.`);
        }

        return errors;
    }
}
