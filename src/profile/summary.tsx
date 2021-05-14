import React, { FC } from 'react';
import { RecentRecipeList } from '@/recipes/recent-recipe-list';
import { PopularRecipeList } from '@/recipes/popular-recipe-list';
import styles from '@/profile/summary.scss';
import { StandardHeader } from '@/common/standard-header';
import { StandardBtn } from '@/common/standard-btn';
import { ClickableCard } from '@/common/clickable-card';
import { RecentCollectionList } from '@/collections/recent-collection-list';

export const Summary: FC = () => (
    <section className={ styles.view }>
        <div>
            <StandardHeader color="white" borderOffset="small">
                <h2>Most popular</h2>
            </StandardHeader>

            <div className={ styles.popularRecipes }>
                <PopularRecipeList amount={ 3 } />
            </div>
        </div>

        <div>
            <StandardHeader color="brown" borderOffset="small">
                <h2>Recent recipes</h2>
            </StandardHeader>

            <div className={ styles.recentRecipes }>
                <RecentRecipeList amount={ 4 } />
                <div className={ styles.button }>
                    <ClickableCard borderOffset="small">
                        <StandardBtn type="button">ALL RECIPES</StandardBtn>
                    </ClickableCard>
                </div>
            </div>
        </div>

        <div>
            <StandardHeader color="brown" borderOffset="small">
                <h2>Recent collections</h2>
            </StandardHeader>

            <div className={ styles.recentCollections }>
                <RecentCollectionList amount={ 4 } />
                <div className={ styles.button }>
                    <ClickableCard borderOffset="small">
                        <StandardBtn type="button">ALL COLLECTIONS</StandardBtn>
                    </ClickableCard>
                </div>
            </div>
        </div>
    </section>
);
