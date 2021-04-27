import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { StatList } from '@/recipe/stat-list';
import styles from '@/recipe/recipe.scss';
import { IngredientList } from '@/recipe/ingredient-list';
import { ImageList } from '@/recipe/image-list';
import { DirectionList } from '@/recipe/direction-list';
import { Card } from '@/recipe/card';
import { ViewNavigation } from '@/common/view-navigation';
import { SubtleBtn } from '@/common/subtle-btn';
import { StandardBtn } from '@/common/standard-btn';
import { Recipe, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

type View = 'Ingredients' | 'Directions' | 'Images';

interface EmptyRecipeState {
    editing: boolean;
    recipe: Recipe;
    view: View;
}

interface Props {
    match: {
        params: {
            id: number;
        };
    };
}

export class EmptyRecipe extends PureComponent<unknown, EmptyRecipeState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            recipe: {
                categories: [],
                description: '',
                id: 0,
                image: '',
                rating: {
                    average: 0,
                    count: 0,
                },
                tags: [],
                title: '',

            },
            view: 'Ingredients',
            editing: true,
        };

        this.handler = this.handler.bind(this);
    }

    public handler(view: string): void {
        this.setState({
            view: view as View,
        });
    }

    public render(): ReactNode {
        const ingredients: string[] = [];
        const directions: string[] = [];
        const images: string[] = [];
        const statsProps = {
            prepTime: '10',
            cookTime: '10',
            yield: '1',
        };
        const cardProps = {
            title: this.state.recipe.title,
            rating: this.state.recipe.rating.average,
            description: this.state.recipe.description,
            image: this.state.recipe.image,
            editing: this.state.editing,
        };

        return (
            <div className={ styles.recipe }>
                <div className={ styles.desktopView }>
                    <div className={ styles.card }>
                        <Card { ...cardProps } />
                    </div>

                    <div className={ styles.details }>
                        <div className={ styles.ingredients }>
                            <h2>Ingredients</h2>
                            <IngredientList
                                ingredients={ ingredients }
                                editing={ this.state.editing } />
                        </div>

                        <div className={ styles.stats }>
                            <StatList
                                { ...statsProps }
                                editing={ this.state.editing } />
                        </div>
                    </div>


                    <div className={ styles.images }>
                        <ImageList
                            images={ images }
                            editing={ this.state.editing } />
                    </div>

                    <div className={ styles.directions }>
                        <h2>Directions</h2>
                        <DirectionList
                            directions={ directions }
                            editing={ this.state.editing } />
                    </div>
                </div>

                <div className={ styles.tabletView }>
                    <div className={ styles.card }>
                        <Card { ...cardProps } />
                    </div>

                    <div className={ styles.stats }>
                        <StatList
                            { ...statsProps }
                            editing={ this.state.editing } />
                    </div>

                    <div className={ styles.navigation }>
                        <ViewNavigation
                            active={ this.state.view }
                            navigations={ ['Ingredients', 'Directions', 'Images'] }
                            handler={ this.handler } />
                    </div>

                    {
                        this.state.view === 'Ingredients' &&
                        <div className={ styles.ingredients }>
                            <IngredientList
                                ingredients={ ingredients }
                                editing={ this.state.editing } />
                        </div>
                    }
                    {
                        this.state.view === 'Directions' &&
                        <div className={ styles.directions }>
                            <DirectionList
                                directions={ directions }
                                editing={ this.state.editing } />
                        </div>
                    }
                    {
                        this.state.view === 'Images' &&
                        <div className={ styles.images }>
                            <ImageList
                                images={ images }
                                editing={ this.state.editing } />
                        </div>
                    }
                </div>


                <div className={ styles.buttons }>
                    <StandardBtn>SAVE RECIPE</StandardBtn>
                </div>
            </div>
        );
    }
}
