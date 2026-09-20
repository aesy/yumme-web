import React, { ReactNode, useState } from 'react';
import { IconStarFilled, IconStarHalfFilled, IconEdit } from '@tabler/icons-react';
import styles from '@/recipe/card.module.scss';
import DefaultRecipeImage from '@/images/DefaultRecipeImage.jpg';
import { StandardImageInput } from '@/common/standard-image-input';
import { recipeImageUrl } from '@/common/recipe-image';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.module.scss';
import { Recipe } from '@/api/yumme-client';

interface CardProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe: (recipe: Recipe) => void;
}

export function Card(props: CardProps): ReactNode {
    const [selectedInput, setSelectedInput] = useState<'title' | 'description' | null>(null);
    const [descriptionErrors, setDescriptionErrors] = useState<string[]>([]);
    const [descriptionInputValue, setDescriptionInputValue] = useState(props.recipe.description ?? '');
    const [titleInputValue, setTitleInputValue] = useState(props.recipe.title ?? '');
    const [titleErrors, setTitleErrors] = useState<string[]>([]);
    const [imageErrors, setImageErrors] = useState<string[]>([]);

    const validateDescription = (value: string): string[] => {
        const errors: string[] = [];
        const min = 1;
        const max = 512;

        if (value.length < min || value.length > max) {
            errors.push(`Description must be between ${min} and ${max} letters.`);
        }

        return errors;
    };

    const validateTitle = (value: string): string[] => {
        const errors: string[] = [];
        const min = 1;
        const max = 128;

        if (value.length < min || value.length > max) {
            errors.push(`Title must be between ${min} and ${max} letters.`);
        }

        return errors;
    };

    const validateImage = (file: File, result: string): Promise<boolean> =>
        new Promise((resolve) => {
            const nextImageErrors = [] as string[];
            const maxMB = 4;
            const minWidth = 1200;
            const minHeight = 800;
            const image = new Image();
            image.src = result;

            image.addEventListener('load', () => {
                if (file.size > maxMB * 1000000) {
                    nextImageErrors.push('Max filesize is 4MB');
                }

                if (image.height < minHeight || image.width < minWidth) {
                    nextImageErrors.push(`Image needs to be at least ${minWidth}x${minHeight}`);
                }

                setImageErrors(nextImageErrors);

                if (nextImageErrors.length) {
                    resolve(false);
                }

                resolve(true);
            });

            image.addEventListener('error', () => {
                resolve(false);
            });
        });

    const trySaveDescription = (callback: () => void): void => {
        const recipe = props.recipe;
        const value = descriptionInputValue;
        const errors = validateDescription(value);

        setDescriptionErrors(errors);

        if (errors.length) {
            return;
        }

        recipe.description = value;
        props.updateRecipe(recipe);
        callback();
    };

    const trySaveTitle = (callback: () => void): void => {
        const recipe = props.recipe;
        const value = titleInputValue;
        const errors = validateTitle(value);

        setTitleErrors(errors);

        if (errors.length) {
            return;
        }

        recipe.title = value;
        props.updateRecipe(recipe);
        callback();
    };

    const deselectInput = (): void => {
        if (selectedInput === 'title') {
            trySaveTitle(() => {
                setSelectedInput(null);
            });
        }

        if (selectedInput === 'description') {
            trySaveDescription(() => {
                setSelectedInput(null);
            });
        }
    };

    const selectInput = (identifier: 'title' | 'description'): void => {
        if (selectedInput === null) {
            setSelectedInput(identifier);

            return;
        }

        if (selectedInput === 'title') {
            trySaveTitle(() => {
                setSelectedInput(identifier);
            });
        }

        if (selectedInput === 'description') {
            trySaveDescription(() => {
                setSelectedInput(identifier);
            });
        }
    };

    const titleOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTitleInputValue(ev.target.value);
    };

    const descriptionOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setDescriptionInputValue(ev.target.value);
    };

    const tryEditImage = (el: React.ChangeEvent<HTMLInputElement>): void => {
        if (el.target.files !== null && el.target.files.length > 0) {
            const fr = new FileReader();
            const file = el.target.files[0];
            fr.readAsDataURL(file);

            fr.onload = async (event: ProgressEvent<FileReader>): Promise<void> => {
                if (typeof event.target?.result === 'string') {
                    const success = await validateImage(file, event.target.result);

                    if (success) {
                        const recipe = props.recipe;
                        recipe.image_cover = event.target.result;

                        props.updateRecipe(recipe);
                    }
                }
            };
        }
    };

    const rating = [];
    const half = 0.5;
    const average = props.recipe.rating?.average ?? 0;

    for (let i = 0; i < average; i++) {
        rating.push(<IconStarFilled />);
    }

    if (average - Math.floor(average) >= half) {
        rating.push(<IconStarHalfFilled />);
    }

    const image = props.recipe.image_cover;
    const imageUrl = image ? recipeImageUrl(props.recipe.id, image) : DefaultRecipeImage;

    if (props.editing) {
        return (
            <div className={styles.card}>
                <div className={styles.cardImage} style={{ backgroundImage: `url(${imageUrl})` }}>
                    <StandardImageInput color="white" errors={imageErrors} onChange={tryEditImage} />
                </div>
                <div className={styles.cardContent}>
                    {selectedInput === 'title' ? (
                        <EditableText
                            tag="h1"
                            value={titleInputValue}
                            placeholder="Title"
                            errors={titleErrors}
                            onKeyDownEnter={deselectInput}
                            onChange={titleOnChange}
                        />
                    ) : (
                        <div
                            className={styles.editable}
                            role="button"
                            tabIndex={0}
                            onClick={(): void => selectInput('title')}
                            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    selectInput('title');
                                }
                            }}
                        >
                            <h1>{props.recipe.title}</h1>
                            <div className={`${editStyles.editButtons} ${styles.edit}`}>
                                <IconEdit className={editStyles.edit} />
                            </div>
                        </div>
                    )}

                    <ul className={styles.rating}>
                        {rating.map((star, i) => (
                            <li key={i}>{star}</li>
                        ))}
                    </ul>

                    {selectedInput === 'description' ? (
                        <EditableText
                            tag="p"
                            value={descriptionInputValue}
                            placeholder="Description"
                            errors={descriptionErrors}
                            onKeyDownEnter={deselectInput}
                            onChange={descriptionOnChange}
                        />
                    ) : (
                        <div
                            className={styles.editable}
                            role="button"
                            tabIndex={0}
                            onClick={(): void => selectInput('description')}
                            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    selectInput('description');
                                }
                            }}
                        >
                            <p>{props.recipe.description}</p>
                            <div className={`${editStyles.editButtons} ${styles.edit}`}>
                                <IconEdit className={editStyles.edit} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardImage} style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className={styles.cardContent}>
                <h1>{props.recipe.title}</h1>

                <ul className={styles.rating}>
                    {rating.map((star, i) => (
                        <li key={i}>{star}</li>
                    ))}
                </ul>

                <p>{props.recipe.description}</p>
            </div>
        </div>
    );
}
