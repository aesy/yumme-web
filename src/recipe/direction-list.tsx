import React, { ReactNode, useState } from 'react';
import { IconEdit, IconTrash, IconCirclePlus } from '@tabler/icons-react';
import styles from '@/recipe/direction-list.module.scss';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.module.scss';
import { Recipe } from '@/api/yumme-client';

interface DirectionListProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

// The API models `directions` as a single newline-delimited string, but the
// numbered step-by-step editing UI here works with a list. These helpers
// convert at the boundary so the rest of the component can keep treating
// directions as a list of steps.
export function DirectionList(props: DirectionListProps): ReactNode {
    const [selectedInput, setSelectedInput] = useState<number | null>(null);
    const [selectedInputValue, setSelectedInputValue] = useState('');
    const [selectedInputErrors, setSelectedInputErrors] = useState<string[]>([]);
    const [addDirectionInputValue, setAddDirectionInputValue] = useState('');
    const [addDirectionInputErrors, setAddDirectionInputErrors] = useState<string[]>([]);

    const getDirections = (): string[] => {
        const directions = props.recipe.directions;

        return directions ? directions.split('\n').filter(direction => direction.length > 0) : [];
    };

    const setDirections = (directions: string[]): void => {
        const recipe = props.recipe;
        recipe.directions = directions.join('\n');
        props.updateRecipe(recipe);
    };

    const validate = (value: string): string[] => {
        const errors: string[] = [];
        const min = 1;
        const max = 500;

        if (value.length < min || value.length > max) {
            errors.push(`Direction must be between ${ min } and ${ max } letters.`);
        }

        return errors;
    };

    const trySaveInput = (callback: () => void): void => {
        const value = selectedInputValue;
        const errors = validate(value);

        if (selectedInput === null) {
            return;
        }

        if (!value) {
            deleteDirection(selectedInput);

            return;
        }

        setSelectedInputErrors(errors);

        if (errors.length) {
            return;
        }

        const directions = getDirections();
        directions[selectedInput] = value;
        setDirections(directions);
        callback();
    };

    const selectInput = (identifier: number): void => {
        const direction = getDirections()[identifier];

        if (selectedInput === null) {
            setSelectedInput(identifier);
            setSelectedInputValue(direction);
        }

        trySaveInput(() => {
            setSelectedInput(identifier);
            setSelectedInputValue(direction);
        });
    };

    const deselectInput = (): void => {
        if (selectedInput === null) {
            return;
        }

        trySaveInput(() => {
            setSelectedInput(null);
        });
    };

    const tryAdd = (): void => {
        const value = addDirectionInputValue;
        const errors = validate(value);

        setAddDirectionInputErrors(errors);

        if (errors.length) {
            return;
        }

        const directions = getDirections();
        directions.push(addDirectionInputValue);
        setDirections(directions);
        setAddDirectionInputValue('');
    };

    const addOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setAddDirectionInputValue(ev.target.value);
    };

    function deleteDirection(identifier: number): void {
        const directions = getDirections();
        directions.splice(identifier, 1);
        setDirections(directions);

        setSelectedInput(null);
    }

    const editOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setSelectedInputValue(ev.target.value);
    };

    const directions = getDirections();

    if (props.editing) {
        return (
            <ul className={ styles.directions }>
                {
                    directions
                        .map((direction, i) => (
                            <li key={ i } className={ styles.direction }>
                                <span className={ styles.label }>
                                    STEP
                                    { ' ' }
                                    { i + 1 }
                                </span>

                                {
                                    selectedInput === i
                                        ? (
                                            <div className={ styles.editable }>
                                                <EditableText
                                                    tag="p"
                                                    value={ selectedInputValue }
                                                    placeholder=""
                                                    errors={ selectedInputErrors }
                                                    onKeyDownEnter={ deselectInput }
                                                    onChange={ editOnChange } />
                                                <div className={ editStyles.editButtons }>
                                                    <IconTrash
                                                        className={ editStyles.delete }
                                                        onClick={ (): void => deleteDirection(i) } />
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className={ styles.editable }
                                                 onClick={ (): void => selectInput(i) }>
                                                <p>{ direction }</p>
                                                <div className={ editStyles.editButtons }>
                                                    <IconEdit className={ editStyles.edit } />
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
                        { directions.length + 1 }
                    </span>
                    <div className={ styles.editable }>
                        <EditableText
                            tag="p"
                            value={ addDirectionInputValue }
                            placeholder="Add direction"
                            errors={ addDirectionInputErrors }
                            onKeyDownEnter={ tryAdd }
                            onChange={ addOnChange } />
                        <div className={ editStyles.editButtons }>
                            <IconCirclePlus
                                className={ editStyles.add }
                                onClick={ tryAdd } />
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

    return (
        directions.length <= 0
            ? <p>No directions added..</p>
            : (
                <ul className={ styles.directions }>
                    {
                        directions
                            .map((direction, i) => (
                                <li key={ i } className={ styles.direction }>
                                <span className={ styles.label }>
                                    STEP
                                    { ' ' }
                                    { i + 1 }
                                </span>
                                    <div>
                                        <p>{ direction }</p>
                                    </div>
                                </li>
                            ))
                    }
                </ul>
            )
    );
}
