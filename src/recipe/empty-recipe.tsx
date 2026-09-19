import { useNavigate } from 'react-router-dom';
import React, { type ReactNode, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import styles from '@/recipe/recipe.module.scss';
import { RecipeViewTablet } from '@/recipe/recipe-view-tablet';
import { RecipeViewDesktop } from '@/recipe/recipe-view-desktop';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { type Recipe, type YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

const BREAKPOINT = 980;

const INITIAL_RECIPE: Recipe = {
    categories: [],
    cook_time: 600,
    prep_time: 600,
    servings: 2,
    description: 'The PERFECT recipe for..',
    directions: '',
    ingredients: [],
    id: 0,
    image_attachments: [],
    rating: {
        average: 0,
        count: 0,
    },
    tags: [],
    title: 'A recipe',
};

export function EmptyRecipe(): ReactNode {
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const navigate = useNavigate();

    const [editing] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<Recipe>(() => structuredClone(INITIAL_RECIPE));
    const [tabletView, setTabletView] = useState<boolean>(window.innerWidth < BREAKPOINT);

    useEffect(() => {
        const onResize = (): void => {
            setTabletView(window.innerWidth < BREAKPOINT);
        };

        window.addEventListener('resize', onResize);

        return (): void => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const updateRecipe = (updatedRecipe: Recipe): void => {
        setRecipe({ ...updatedRecipe });
    };

    const uploadRecipe = async (): Promise<void> => {
        setLoading(true);

        const request = {
            categories: recipe.categories ?? [],
            cook_time: recipe.cook_time ?? 0,
            description: recipe.description ?? '',
            public: true,
            directions: recipe.directions ?? '',
            ingredients: recipe.ingredients ?? [],
            prep_time: recipe.prep_time ?? 0,
            servings: recipe.servings ?? 1,
            tags: recipe.tags ?? [],
            title: recipe.title ?? '',
        };
        const createdRecipe = await yummeClient.createRecipe(request);

        navigate(`/recipe/${ createdRecipe.id }`);
    };

    return (
        <div className={ styles.recipe }>
            {
                tabletView
                    ? <RecipeViewTablet
                        recipe={ recipe }
                        editing={ editing }
                        updateRecipe={ updateRecipe } />
                    : <RecipeViewDesktop
                        recipe={ recipe }
                        editing={ editing }
                        updateRecipe={ updateRecipe } />
            }

            <div className={ styles.buttons }>
                {
                    loading
                        ? <div className={ styles.saveLoadingWrapper }>
                            <LoadingSpinner color="orange" />
                          </div>
                        : <StandardBtn
                            type="button"
                            onClick={ uploadRecipe }>
                            SAVE RECIPE
                          </StandardBtn>
                }
            </div>
        </div>
    );
}
