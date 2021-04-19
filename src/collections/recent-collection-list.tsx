import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { EmptyProps } from '@/utils/react';
import { Collection, YUMME_CLIENT_TYPE, YummeClient } from '@/api/yumme-client';
import { CollectionListItem } from './collection-list.item';

interface Prop {
    collection: Collection;
    images: string[];
}

interface IState {
    props: Prop[];
}

export class RecentCollectionList extends PureComponent<EmptyProps, IState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: EmptyProps) {
        super(props);

        this.state = {
            props: [],
        };
    }

    public componentDidMount(): void {
        this.yummeClient.getRecentCollections().then(collections => {
            const state: Prop[] = [];

            for (const collection of collections) {
                const images: string[] = [];

                for (const id of collection.recipes) {
                    this.yummeClient.getRecipeById(id).then(recipe => {
                        images.push(recipe.image);
                    }).catch(err => {
                        console.error(err);
                    });
                }

                state.push({
                    collection,
                    images,
                });
            }

            return state;
        }).then(state => {
            this.setState({ props: state });
        }).catch(err => {
            console.error(err);
        });
    }

    public render(): ReactNode {
        return (
            <ul>
                {
                    this.state.props
                    .map(prop => (<li key={ prop.collection.id }>
                           <CollectionListItem collection={ prop.collection } images={ prop.images } />
                                  </li>))
                }
            </ul>
        );
    }
}
