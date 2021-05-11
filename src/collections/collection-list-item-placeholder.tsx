import React, { FC } from 'react';
import styles from '@/collections/collection-list-item-placeholder.scss';

export const CollectionListItemPlaceholder: FC<unknown> = props => (
    <div className={ styles.collectionListItemPlaceholder }>
        <div className={ styles.imagesPlaceholder }>
            <span className={ styles.imagePlaceholder } />
            <span className={ styles.imagePlaceholder } />
            <span className={ styles.imagePlaceholder } />
            <span className={ styles.imagePlaceholder } />
        </div>
        <div className={ styles.textPlaceholder } />
    </div>
);
