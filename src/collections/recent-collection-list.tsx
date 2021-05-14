import React, { Component, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import styles from '@/collections/collection-list.scss';
import { CollectionListItem } from '@/collections/collection-list.item';
import { CollectionListItemPlaceholder } from '@/collections/collection-list-item-placeholder';
import { Collection, YUMME_CLIENT_TYPE, YummeClient } from '@/api/yumme-client';

interface CollectionWithImages {
    collection: Collection;
    images: string[];
}

interface RecentCollectionListState {
    collections?: CollectionWithImages[];
}

interface RecentCollectionListProps {
    amount: number;
}

export class RecentCollectionList extends Component<RecentCollectionListProps, RecentCollectionListState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: RecentCollectionListProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount(): void {
        this.refresh();
    }

    public render(): ReactNode {
        const placeholders = [];

        for (let i = 0; i < this.props.amount; i++) {
            placeholders.push(<CollectionListItemPlaceholder />);
        }

        if (!this.state.collections) {
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

        if (!this.state.collections.length) {
            return (
                <p>Seems like there aren&apos;t any :(</p>
            );
        }

        return (
            <ul>
                {
                    this.state.collections
                        .map(elem => (
                            <li className={ styles.collectionListItem } key={ elem.collection.id }>
                                <CollectionListItem collection={ elem.collection } images={ elem.images } />
                            </li>
                        ))
                }
            </ul>
        );
    }

    private async getImages(collection: Collection): Promise<string[]> {
        const images: string[] = [];

        for (const id of collection.recipes) {
            const recipe = await this.yummeClient.getRecipeById(id);

            images.push(recipe.images[0]);
        }

        return images;
    }

    private async refresh(): Promise<void> {
        const collections = await this.yummeClient.getRecentCollections();
        const collectionWithImages: CollectionWithImages[] = [];

        for (const collection of collections) {
            const images = await this.getImages(collection);

            collectionWithImages.push({
                collection,
                images,
            });
        }

        this.setState({ collections: collectionWithImages });
    }
}
