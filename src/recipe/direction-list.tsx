/* eslint-disable @typescript-eslint/member-ordering */
import React, { Component, ReactNode } from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/direction-list.scss';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.scss';
import { Recipe } from '@/api/yumme-client';

interface DirectionListProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

interface DirectionListState {
    addDirectionInputErrors: string[];
    addDirectionInputValue: string;
    selectedInput: number | null;
    selectedInputErrors: string[];
    selectedInputValue: string;
}

export class DirectionList extends Component<DirectionListProps, DirectionListState> {
    public constructor(props: DirectionListProps) {
        super(props);

        this.state = {
            selectedInput: null,
            selectedInputValue: '',
            selectedInputErrors: [],
            addDirectionInputValue: '',
            addDirectionInputErrors: [],
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ styles.directions }>
                    {
                        this.props.recipe.directions
                            .map((direction, i) => (
                                <li key={ i } className={ styles.direction }>
                                    <span className={ styles.label }>
                                        STEP
                                        { ' ' }
                                        { i + 1 }
                                    </span>

                                    {
                                        this.state.selectedInput === i
                                            ? (
                                                <div className={ styles.editable }>
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
                                                </div>
                                            )
                                            : (
                                                <div className={ styles.editable }
                                                     onClick={ (): void => this.selectInput(i) }>
                                                    <p>{ direction }</p>
                                                    <div className={ editStyles.editButtons }>
                                                        <EditSharpIcon className={ editStyles.edit } />
                                                    </div>
                                                </div>
                                            )
                                    }
                                </li>
                            ))
                    }

                    <li className={ styles.direction }>
                        <span className={ styles.label }>
                            STEP
                            { ' ' }
                            { this.props.recipe.directions.length + 1 }
                        </span>
                        <div className={ styles.editable }>
                            <EditableText
                                tag="p"
                                value={ this.state.addDirectionInputValue }
                                placeholder="Add direction"
                                errors={ this.state.addDirectionInputErrors }
                                onKeyDownEnter={ this.tryAdd }
                                onChange={ this.addOnChange } />
                            <div className={ editStyles.editButtons }>
                                <AddCircleSharpIcon
                                    className={ editStyles.add }
                                    onClick={ this.tryAdd } />
                            </div>
                        </div>
                    </li>
                </ul>
            );
        }

        return (
            this.props.recipe.directions.length <= 0
                ? <p>No directions added..</p>
                : (
                    <ul className={ styles.directions }>
                        {
                            this.props.recipe.directions
                                .map((direction, i) => (
                                    <li key={ i } className={ styles.direction }>
                                    <span className={ styles.label }>
                                        STEP
                                        { ' ' }
                                        { i + 1 }
                                    </span>
                                        <div className={ styles.content }>
                                            <p>{ direction }</p>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                )
        );
    }

    @Bind
    private selectInput(identifier: number): void {
        const recipe = this.props.recipe;
        const previousSelectedInput = this.state.selectedInput;
        const direction = recipe.directions[identifier];

        if (previousSelectedInput === null) {
            this.setState({
                selectedInput: identifier,
                selectedInputValue: direction,
            });
        }

        this.trySaveInput(() => {
            this.setState({
                selectedInput: identifier,
                selectedInputValue: direction,
            });
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

        recipe.directions[selectedInput] = value;
        this.props.updateRecipe(recipe);
        callback();
    }

    @Bind
    private tryAdd(): void {
        const recipe = this.props.recipe;
        const value = this.state.addDirectionInputValue;
        const addDirectionInputErrors = this.validate(value);

        this.setState({ addDirectionInputErrors });

        if (addDirectionInputErrors.length) {
            return;
        }

        recipe.directions.push(this.state.addDirectionInputValue);
        this.props.updateRecipe(recipe);
        this.setState({ addDirectionInputValue: '' });
    }

    @Bind
    private addOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ addDirectionInputValue: ev.target.value });
    }

    @Bind
    private delete(identifier: number): void {
        const recipe = this.props.recipe;
        recipe.directions.splice(identifier, 1);
        this.props.updateRecipe(recipe);

        this.setState({
            selectedInput: null,
        });
    }

    @Bind
    private editOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ selectedInputValue: ev.target.value });
    }

    private validate(value: string): string[] {
        const errors: string[] = [];
        const min = 1;
        const max = 500;

        if (value.length < min || value.length > max) {
            errors.push(`Direction must be between ${ min } and ${ max } letters.`);
        }

        return errors;
    }
}
