import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { CollectionListItem } from '@/collections/collection-list.item';
import { Collection, YUMME_CLIENT_TYPE, YummeClient } from '@/api/yumme-client';

interface CollectionWithImages {
    collection: Collection;
    images: string[];
}

interface RecentCollectionListState {
    collections: CollectionWithImages[];
}

export class RecentCollectionList extends PureComponent<unknown, RecentCollectionListState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            collections: [],
        };
    }

    public componentDidMount(): void {
        this.refresh();
    }

    public render(): ReactNode {
        return (
            <ul>
                {
                    this.state.collections
                        .map(elem => (
                            <li key={ elem.collection.id }>
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

            images.push(recipe.image);
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
