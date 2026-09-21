import React, { ReactNode, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import styles from '@/recipe/image-list.module.scss';
import { StandardImageInput } from '@/common/standard-image-input';
import { recipeImageUrl } from '@/common/recipe-image';
import editStyles from '@/common/edit.module.scss';
import { Recipe } from '@/api/yumme-client';

interface ImageListProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe: (recipe: Recipe) => void;
}

export function ImageList(props: ImageListProps): ReactNode {
    const [errors, setErrors] = useState<string[]>([]);

    const getImages = (): string[] => props.recipe.image_attachments ?? [];

    const deleteImage = (identifier: number): void => {
        const recipe = props.recipe;
        const images = getImages();
        images.splice(identifier, 1);
        recipe.image_attachments = images;

        props.updateRecipe(recipe);
    };

    const validate = (file: File, result: string): Promise<boolean> =>
        new Promise((resolve) => {
            const nextErrors = [] as string[];
            const maxMB = 4;
            const minWidth = 1200;
            const minHeight = 800;
            const image = new Image();
            image.src = result;

            image.addEventListener('load', () => {
                if (file.size > maxMB * 1000000) {
                    nextErrors.push('Max filesize is 4MB');
                }

                if (image.height < minHeight || image.width < minWidth) {
                    nextErrors.push(`Image needs to be atleast ${minWidth}x${minHeight}`);
                }

                setErrors(nextErrors);

                if (nextErrors.length) {
                    resolve(false);
                }

                resolve(true);
            });

            image.addEventListener('error', () => {
                resolve(false);
            });
        });

    const tryAddImage = (el: React.ChangeEvent<HTMLInputElement>): void => {
        if (el.target.files !== null && el.target.files.length > 0) {
            const fr = new FileReader();
            const file = el.target.files[0];
            fr.readAsDataURL(file);

            fr.onload = async (event: ProgressEvent<FileReader>): Promise<void> => {
                if (typeof event.target?.result === 'string') {
                    const success = await validate(file, event.target.result);

                    if (success) {
                        const recipe = props.recipe;
                        const images = getImages();
                        images.push(event.target.result);
                        recipe.image_attachments = images;

                        props.updateRecipe(recipe);
                    }
                }
            };
        }
    };

    if (props.editing) {
        return (
            <ul className={styles.images}>
                {getImages().map((image, i) => (
                    <li key={i}>
                        <img
                            className={styles.image}
                            src={recipeImageUrl(props.recipe.slug, image)}
                            alt={props.recipe.title ?? 'Recipe'}
                        />
                        <div className={`${editStyles.editButtons} ${styles.deleteBtnWrapper}`}>
                            <IconTrash className={editStyles.delete} onClick={(): void => deleteImage(i)} />
                        </div>
                    </li>
                ))}

                <li>
                    <span className={styles.image}>
                        <StandardImageInput errors={errors} color="white" onChange={tryAddImage} />
                    </span>
                </li>
            </ul>
        );
    }

    return (
        <ul className={styles.images}>
            {getImages().map((image, i) => (
                <li key={i}>
                    <img
                        className={styles.image}
                        src={recipeImageUrl(props.recipe.slug, image)}
                        alt={props.recipe.title ?? 'Recipe'}
                    />
                </li>
            ))}
        </ul>
    );
}
