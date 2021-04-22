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
import { Recipe as RecipeType, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

type View = 'Ingredients' | 'Directions' | 'Images';

interface RecipeState {
    recipe: RecipeType | null;
    view: View;
}

interface Props {
    match: {
        params: {
            id: number;
        };
    };
}

export class Recipe extends PureComponent<Props, RecipeState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: Props) {
        super(props);

        this.state = {
            recipe: null,
            view: 'Ingredients',
        };

        this.handler = this.handler.bind(this);
    }

    public componentDidMount(): void {
        this.refresh(this.props.match.params.id);
    }

    public handler(view: string): void {
        this.setState({
            view: view as View,
        });
    }

    public render(): ReactNode {
        const ingredients = [
            '1 pound raw peeled and deveined shrimp',
            '1 pound raw peeled and deveined shrimp',
            '1 pound raw peeled and deveined shrimp',
            '1 pound raw peeled and deveined shrimp',
            '1 pound raw peeled and deveined shrimp',
            '1 pound raw peeled and deveined shrimp',
            '1 pound raw peeled and deveined shrimp',
        ];
        const directions = [
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
        ];
        const images = [
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
        ];
        const stats = [
            {
                type: 'Prep time',
                value: '15min',
            },
            {
                type: 'Cook time',
                value: '15min',
            },
            {
                type: 'Yield',
                value: '4 servings',
            },
        ];

        return (
            <div className={ styles.recipe }>
                <div className={ styles.desktopView }>
                    <div className={ styles.card }>
                        <Card
                            title={ this.state.recipe?.title }
                            rating={ this.state.recipe?.rating.average }
                            description={ this.state.recipe?.description }
                            image={ this.state.recipe?.image } />
                    </div>

                    <div className={ styles.details }>
                        <div className={ styles.ingredients }>
                            <h2>Ingredients</h2>
                            <IngredientList ingredients={ ingredients } />
                        </div>

                        <div className={ styles.stats }>
                            <StatList stats={ stats } />
                        </div>
                    </div>


                    <div className={ styles.images }>
                        <ImageList images={ images } />
                    </div>

                    <div className={ styles.directions }>
                        <h2>Directions</h2>
                        <DirectionList directions={ directions } />
                    </div>
                </div>

                <div className={ styles.tabletView }>
                    <div className={ styles.card }>
                        <Card
                            title={ this.state.recipe?.title }
                            rating={ this.state.recipe?.rating.average }
                            description={ this.state.recipe?.description }
                            image={ this.state.recipe?.image } />
                    </div>

                    <div className={ styles.stats }>
                        <StatList stats={ stats } />
                    </div>

                    <div className={ styles.navigation }>
                        <ViewNavigation active={ this.state.view } navigations={ ['Ingredients', 'Directions', 'Images'] } handler={ this.handler } />
                    </div>

                    {
                        this.state.view === 'Ingredients' &&
                        <div className={ styles.ingredients }>
                            <IngredientList ingredients={ ingredients } />
                        </div>
                    }
                    {
                        this.state.view === 'Directions' &&
                         <div className={ styles.directions }>
                             <DirectionList directions={ directions } />
                         </div>
                    }
                    {
                        this.state.view === 'Images' &&
                         <div className={ styles.images }>
                            <ImageList images={ images } />
                         </div>
                    }
                </div>


                <div className={ styles.buttons }>
                    <StandardBtn>EDIT RECIPE</StandardBtn>
                    <SubtleBtn color="red">DELETE RECIPE</SubtleBtn>
                </div>

            </div>
        );
    }

    private async refresh(id: number): Promise<void> {
        const recipe = await this.yummeClient.getRecipeById(id);

        this.setState({ recipe });
    }
}
