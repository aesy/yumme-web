import React, { type ReactNode, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import styles from '@/recipes/recipe-list.module.scss';
import { RecipeListItemPlaceholder } from '@/recipes/recipe-list-item-placeholder';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { type Recipe, type YummeClient, YUMME_CLIENT_TYPE, type User } from '@/api/yumme-client';

interface RecentRecipeListProps {
    amount: number;
    user: User;
}

const BREAKPOINT = 640;

export function RecentRecipeList(props: RecentRecipeListProps): ReactNode {
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const [onSmallScreen, setOnSmallScreen] = useState<boolean>(window.innerWidth < BREAKPOINT);
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);

    useEffect(() => {
        const onResize = (): void => {
            setOnSmallScreen(window.innerWidth < BREAKPOINT);
        };

        window.addEventListener('resize', onResize);

        return (): void => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        const refresh = async (): Promise<void> => {
            const recentRecipes = await yummeClient.getRecentRecipesByUser(props.user.id ?? 0, props.amount);

            setRecipes(recentRecipes);
        };

        void refresh();
    }, [yummeClient, props.user.id, props.amount]);

    const placeholders = [];

    for (let i = 0; i < props.amount; i++) {
        placeholders.push(<RecipeListItemPlaceholder type={ onSmallScreen ? 'column' : 'row' } />);
    }

    if (!recipes) {
        return (
            <ul>
                {
                    placeholders.map((placeholder, i) => (
                        <li key={ i }>
                            { placeholder }
                        </li>
                    ))
                }
            </ul>
        );
    }

    if (!recipes.length) {
        return (
            <p>Seems like there aren&apos;t any :(</p>
        );
    }

    return (
        <ul>
            {
                recipes
                    .map(recipe => (
                        <li className={ styles.recipeListItem } key={ recipe.id }>
                            <RecipeListItem recipe={ recipe }
                                            type={ onSmallScreen ? 'column' : 'row' } />
                        </li>
                    ))
            }
        </ul>
    );
}
