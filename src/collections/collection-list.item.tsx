import React, { FC } from 'react';
import { ClickableCard } from '@/common/clickable-card';
import styles from '@/collections/collection-list-item.scss';
import { Collection } from '@/api/yumme-client';


interface RecipeListItemProps {
    readonly collection: Collection;
    readonly images: string[];
}

export const CollectionListItem: FC<RecipeListItemProps> = props => (
    <ClickableCard borderOffset="medium">
        <article className={ styles.collectionListItem }>
            {
                props.images
                .map(image => <span key={ props.collection.id } style={{ backgroundImage: `url(${ image })` }} />)
            }
            <h3>
                { props.collection.title }
            </h3>
        </article>
    </ClickableCard>
);
