import React, { Component, ReactNode } from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/ingredient-list.scss';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.scss';

interface Props {
    editing: boolean;
    ingredients: string[];
}

interface IngredientListState {
    current: number | null;
    ingredients: string[];
    newIngredient: string;
}

export class IngredientList extends Component<Props, IngredientListState> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            current: null,
            ingredients: this.props.ingredients,
            newIngredient: '',
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ styles.ingredients }>
                    {
                        this.state.ingredients
                            .map((ingredient, i) => (
                                <li key={ i } className={ styles.ingredient }>
                                    {
                                        this.state.current === i
                                        ? (
                                            <>
                                                <EditableText
                                                    tag="p"
                                                    placeholder=""
                                                    value={ ingredient }
                                                    onChange={ this.editOnChange } />
                                                <div className={ editStyles.editButtons }>
                                                    <DeleteSharpIcon className={ editStyles.delete } onClick={ (): void => this.delete(i) } />
                                                    <CheckCircleSharpIcon className={ editStyles.save } onClick={ (): void => this.toggleEdit(i) } />
                                                </div>
                                            </>
                                        )
                                        : (
                                            <>
                                                <p>{ingredient}</p>
                                                <div className={ `${ editStyles.editButtons } ${ styles.deleteBtnWrapper }` }>
                                                    <EditSharpIcon className={ editStyles.edit } onClick={ (): void => this.toggleEdit(i) } />
                                                </div>
                                            </>
                                        )
                                    }
                                </li>
                            ))
                    }

                    <li className={ styles.ingredient }>
                        <EditableText
                            tag="p"
                            placeholder="Add ingredient"
                            value={ this.state.newIngredient }
                            onChange={ this.addOnChange } />

                        <div className={ editStyles.editButtons }>
                            <AddCircleSharpIcon className={ editStyles.add } onClick={ this.add } />
                        </div>
                    </li>
                </ul>
            );
        }

        return (
            <ul className={ styles.ingredients }>
                {
                    this.state.ingredients
                        .map((ingredient, i) => (
                            <li key={ i } className={ styles.ingredient }>
                                <p>{ingredient}</p>
                            </li>
                        ))
                }
            </ul>
        );
    }

    @Bind
    private add(): void {
        this.setState(state => {
            if (state.newIngredient) {
                const ingredients = state.ingredients.splice(0);
                ingredients.push(state.newIngredient);

                return {
                    ingredients,
                    newIngredient: '',
                };
            }

            return null;
        });
    }

    @Bind
    private addOnChange(value: string): void {
        this.setState({
            newIngredient: value,
        });
    }

    @Bind
    private delete(identifier: number): void {
        this.setState(state => {
            const ingredients = state.ingredients.splice(0);
            ingredients.splice(identifier, 1);

            return {
                ingredients,
                current: null,
            };
        });
    }

    @Bind
    private editOnChange(value: string): void {
        this.setState(state => {
            if (state.current !== null) {
                const ingredients = state.ingredients.splice(0);

                ingredients[state.current] = value;

                return {
                    ingredients,
                };
            }

            return null;
        });
    }


    @Bind
    private toggleEdit(identifier: number): void {
        if (this.state.current !== identifier) {
            this.setState({
                current: identifier,
            });
        } else {
            this.setState({
                current: null,
            });
        }
    }
}
