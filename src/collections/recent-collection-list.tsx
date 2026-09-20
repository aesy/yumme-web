import React, { type ReactNode, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import DefaultRecipeImage from '@/images/DefaultRecipeImage.jpg';
import styles from '@/collections/collection-list.module.scss';
import { CollectionListItem } from '@/collections/collection-list.item';
import { CollectionListItemPlaceholder } from '@/collections/collection-list-item-placeholder';
import { type Collection, YUMME_CLIENT_TYPE, type YummeClient } from '@/api/yumme-client';

interface CollectionWithImages {
    collection: Collection;
    images: string[];
}

interface RecentCollectionListProps {
    amount: number;
}

export function RecentCollectionList(props: RecentCollectionListProps): ReactNode {
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const [collections, setCollections] = useState<CollectionWithImages[] | undefined>(undefined);

    useEffect(() => {
        const getImages = async (collection: Collection): Promise<string[]> => {
            const images: string[] = [];

            for (const id of collection.recipes ?? []) {
                const recipe = await yummeClient.getRecipeById(id);

                images.push(recipe.image_cover || DefaultRecipeImage);
            }

            return images;
        };

        const refresh = async (): Promise<void> => {
            const recentCollections = await yummeClient.getRecentCollections();
            const collectionWithImages: CollectionWithImages[] = [];

            for (const collection of recentCollections) {
                const images = await getImages(collection);

                collectionWithImages.push({
                    collection,
                    images,
                });
            }

            setCollections(collectionWithImages);
        };

        void refresh();
    }, [yummeClient]);

    const placeholders = [];

    for (let i = 0; i < props.amount; i++) {
        placeholders.push(<CollectionListItemPlaceholder />);
    }

    if (!collections) {
        return (
            <ul>
                {placeholders.map((placeholder, i) => (
                    <li key={i}>{placeholder}</li>
                ))}
            </ul>
        );
    }

    if (!collections.length) {
        return <p>Seems like there aren&apos;t any :(</p>;
    }

    return (
        <ul>
            {collections.map((elem) => (
                <li className={styles.collectionListItem} key={elem.collection.id}>
                    <CollectionListItem collection={elem.collection} images={elem.images} />
                </li>
            ))}
        </ul>
    );
}
