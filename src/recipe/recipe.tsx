import { useNavigate, useParams } from 'react-router-dom';
import React, { type ReactNode, useCallback, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import styles from '@/recipe/recipe.module.scss';
import { RecipeViewTablet } from '@/recipe/recipe-view-tablet';
import { RecipeViewDesktop } from '@/recipe/recipe-view-desktop';
import { SubtleBtn } from '@/common/subtle-btn';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { type Recipe as RecipeType, type YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

const BREAKPOINT = 811;

export function Recipe(): ReactNode {
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentRecipe, setCurrentRecipe] = useState<RecipeType | undefined>(undefined);
    const [editedRecipe, setEditedRecipe] = useState<RecipeType | undefined>(undefined);
    const [editing, setEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [tabletView, setTabletView] = useState<boolean>(window.innerWidth < BREAKPOINT);

    const refresh = useCallback(
        async (recipeId: number): Promise<void> => {
            const recipe = await yummeClient.getRecipeById(recipeId);

            setEditing(false);
            setLoading(false);
            setCurrentRecipe(JSON.parse(JSON.stringify(recipe)) as RecipeType);
            setEditedRecipe(JSON.parse(JSON.stringify(recipe)) as RecipeType);
        },
        [yummeClient],
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const onResize = (): void => {
            setTabletView(window.innerWidth < BREAKPOINT);
        };

        window.addEventListener('resize', onResize);

        return (): void => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        void refresh(Number(id));
    }, [id, refresh]);

    const deleteRecipe = async (): Promise<void> => {
        setLoading(true);

        try {
            await yummeClient.deleteRecipe(Number(id));
        } catch {
            setLoading(false);
        }

        void navigate('/');
    };

    const saveRecipe = async (): Promise<void> => {
        setLoading(true);

        if (!editedRecipe) {
            return;
        }

        const request = {
            categories: editedRecipe.categories ?? [],
            cook_time: editedRecipe.cook_time ?? 0,
            description: editedRecipe.description ?? '',
            public: true,
            directions: editedRecipe.directions ?? '',
            ingredients: editedRecipe.ingredients ?? [],
            prep_time: editedRecipe.prep_time ?? 0,
            servings: editedRecipe.servings ?? 1,
            tags: editedRecipe.tags ?? [],
            title: editedRecipe.title ?? '',
        };
        const recipeId = Number(id);
        await yummeClient.replaceRecipe(recipeId, request);

        await refresh(recipeId);
    };

    const toggleEditing = (): void => {
        setEditing((prevEditing) => !prevEditing);
    };

    const updateRecipe = (recipe: RecipeType): void => {
        setEditedRecipe({ ...recipe });
    };

    const recipe = editing ? editedRecipe : currentRecipe;

    if (!recipe) {
        return (
            <div className={styles.recipeLoadingWrapper}>
                <LoadingSpinner color="white" />
            </div>
        );
    }

    return (
        <div className={styles.recipe}>
            {tabletView ? (
                <div className={styles.recipeWrapper}>
                    <RecipeViewTablet recipe={recipe} editing={editing} updateRecipe={updateRecipe} />
                </div>
            ) : (
                <div className={styles.recipeWrapper}>
                    <RecipeViewDesktop recipe={recipe} editing={editing} updateRecipe={updateRecipe} />
                </div>
            )}

            <div className={styles.buttons}>
                {loading && (
                    <div className={styles.saveLoadingWrapper}>
                        <LoadingSpinner color="orange" />
                    </div>
                )}
                {editing && !loading && (
                    <>
                        <StandardBtn
                            type="button"
                            onClick={() => {
                                void saveRecipe();
                            }}
                        >
                            SAVE RECIPE
                        </StandardBtn>
                        <StandardBtn type="button" onClick={toggleEditing}>
                            CANCEL EDITING
                        </StandardBtn>
                    </>
                )}
                {!editing && !loading && (
                    <>
                        <StandardBtn type="button" onClick={toggleEditing}>
                            EDIT RECIPE
                        </StandardBtn>
                        <SubtleBtn
                            color="red"
                            onClick={() => {
                                void deleteRecipe();
                            }}
                        >
                            DELETE RECIPE
                        </SubtleBtn>
                    </>
                )}
            </div>
        </div>
    );
}
