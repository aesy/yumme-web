import React, { type ReactNode, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import styles from '@/recipes/recipe-list.module.scss';
import { RecipeListItemPlaceholder } from '@/recipes/recipe-list-item-placeholder';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { YUMME_CLIENT_TYPE, type Recipe, type YummeClient, type User } from '@/api/yumme-client';

interface RecentRecipeListProps {
    amount: number;
    user: User;
}

export function PopularRecipeList(props: RecentRecipeListProps): ReactNode {
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);

    useEffect(() => {
        const refresh = async (): Promise<void> => {
            const popularRecipes = await yummeClient.getPopularRecipesByUser(props.user.id ?? 0, props.amount);

            setRecipes(popularRecipes);
        };

        void refresh();
    }, [yummeClient, props.user.id, props.amount]);

    const placeholders = [];

    for (let i = 0; i < props.amount; i++) {
        placeholders.push(<RecipeListItemPlaceholder type="column" />);
    }

    if (!recipes) {
        return (
            <ul>
                {placeholders.map((placeholder, i) => (
                    <li key={i}>{placeholder}</li>
                ))}
            </ul>
        );
    }

    if (!recipes.length) {
        return <p>Seems like there aren&apos;t any :(</p>;
    }

    return (
        <ul>
            {recipes.map((recipe) => (
                <li className={styles.recipeListItem} key={recipe.id}>
                    <RecipeListItem recipe={recipe} type="column" />
                </li>
            ))}
        </ul>
    );
}
