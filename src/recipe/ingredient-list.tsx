import React, { ReactNode, useState } from 'react';
import { IconEdit, IconTrash, IconCirclePlus } from '@tabler/icons-react';
import styles from '@/recipe/ingredient-list.module.scss';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.module.scss';
import { type Ingredient, Recipe } from '@/api/yumme-client';

interface IngredientListProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe: (recipe: Recipe) => void;
}

export function IngredientList(props: IngredientListProps): ReactNode {
    const [selectedInput, setSelectedInput] = useState<number | null>(null);
    const [selectedInputValue, setSelectedInputValue] = useState('');
    const [selectedInputErrors, setSelectedInputErrors] = useState<string[]>([]);
    const [addIngredientInputValue, setAddIngredientInputValue] = useState('');
    const [addIngredientInputErrors, setAddIngredientInputErrors] = useState<string[]>([]);

    const getIngredients = (): Ingredient[] => props.recipe.ingredients ?? [];

    const validate = (value: string): string[] => {
        const errors: string[] = [];
        const min = 1;
        const max = 200;

        if (value.length < min || value.length > max) {
            errors.push(`Ingredient must be between ${min} and ${max} letters.`);
        }

        return errors;
    };

    function deleteIngredient(identifier: number): void {
        const recipe = props.recipe;
        const ingredients = getIngredients();
        ingredients.splice(identifier, 1);
        recipe.ingredients = ingredients;
        props.updateRecipe(recipe);

        setSelectedInput(null);
    }

    const trySaveInput = (callback: () => void): void => {
        const recipe = props.recipe;
        const value = selectedInputValue;
        const errors = validate(value);

        if (selectedInput === null) {
            return;
        }

        if (!value) {
            deleteIngredient(selectedInput);

            return;
        }

        setSelectedInputErrors(errors);

        if (errors.length) {
            return;
        }

        const ingredients = getIngredients();
        ingredients[selectedInput] = { name: value };
        recipe.ingredients = ingredients;
        props.updateRecipe(recipe);
        callback();
    };

    const selectInput = (identifier: number): void => {
        const ingredient = getIngredients()[identifier];

        if (selectedInput === null) {
            setSelectedInput(identifier);
            setSelectedInputValue(ingredient.name ?? '');
        }

        trySaveInput(() => {
            setSelectedInput(identifier);
            setSelectedInputValue(ingredient.name ?? '');
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

    const editOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setSelectedInputValue(ev.target.value);
    };

    const tryAdd = (): void => {
        const recipe = props.recipe;
        const value = addIngredientInputValue;
        const errors = validate(value);

        setAddIngredientInputErrors(errors);

        if (errors.length) {
            return;
        }

        const ingredients = getIngredients();
        ingredients.push({
            name: addIngredientInputValue,
        });
        recipe.ingredients = ingredients;
        props.updateRecipe(recipe);
        setAddIngredientInputValue('');
    };

    const addOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setAddIngredientInputValue(ev.target.value);
    };

    if (props.editing) {
        return (
            <ul className={styles.ingredients}>
                {getIngredients().map((ingredient, i) =>
                    selectedInput === i ? (
                        <li key={i} className={styles.ingredient}>
                            <EditableText
                                tag="p"
                                value={selectedInputValue}
                                placeholder=""
                                errors={selectedInputErrors}
                                onKeyDownEnter={deselectInput}
                                onChange={editOnChange}
                            />
                            <div className={editStyles.editButtons}>
                                <IconTrash className={editStyles.delete} onClick={(): void => deleteIngredient(i)} />
                            </div>
                        </li>
                    ) : (
                        <li key={i}>
                            <button
                                type="button"
                                className={`${styles.ingredient} ${styles.editable}`}
                                onClick={(): void => selectInput(i)}
                            >
                                <div className={styles.item}>
                                    <span className={styles.dot} />
                                    <p>{ingredient.name}</p>
                                </div>
                                <div className={editStyles.editButtons}>
                                    <IconEdit className={editStyles.edit} />
                                </div>
                            </button>
                        </li>
                    ),
                )}

                <li className={styles.ingredient}>
                    <EditableText
                        tag="p"
                        value={addIngredientInputValue}
                        placeholder="Add ingredient"
                        errors={addIngredientInputErrors}
                        onKeyDownEnter={tryAdd}
                        onChange={addOnChange}
                    />
                    <div className={editStyles.editButtons}>
                        <IconCirclePlus className={editStyles.add} onClick={tryAdd} />
                    </div>
                </li>
            </ul>
        );
    }

    return getIngredients().length <= 0 ? (
        <p>No ingredients added..</p>
    ) : (
        <ul className={styles.ingredients}>
            {getIngredients().map((ingredient, i) => (
                <li key={i} className={styles.ingredient}>
                    <div className={styles.item}>
                        <span className={styles.dot} />
                        <p>{ingredient.name}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
