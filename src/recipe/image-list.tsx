import React, { Component, ReactNode } from 'react';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/image-list.scss';
import { StandardImageInput } from '@/common/standard-image-input';
import editStyles from '@/common/edit.scss';
import { Recipe } from '@/api/yumme-client';

interface ImageListProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

interface ImageListState {
    errors: string[];
}

export class ImageList extends Component<ImageListProps, ImageListState> {
    public constructor(props: ImageListProps) {
        super(props);

        this.state = {
            errors: [],
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ `${ styles.images } ${ styles.editing }` }>
                    {
                        this.props.recipe.images
                            .map((image, i) => (
                                <li key={ i }>
                                    <img className={ styles.image } src={ image } />
                                    <div className={ `${ editStyles.editButtons } ${ styles.deleteBtnWrapper }` }>
                                        <DeleteSharpIcon className={ editStyles.delete } onClick={ (): void => this.delete(i) } />
                                    </div>
                                </li>
                            ))
                    }

                    <li>
                        <span className={ styles.image }>
                            <StandardImageInput
                                errors={ this.state.errors }
                                color="white"
                                onChange={ this.tryAddImage } />
                        </span>
                    </li>
                </ul>
            );
        }

        return (
            <ul className={ styles.images }>
                {
                    this.props.recipe.images
                        .map((image, i) => (
                            <li key={ i }>
                                <img className={ styles.image } src={ image } />
                            </li>
                        ))
                }
            </ul>
        );
    }

    @Bind
    private delete(identifier: number): void {
        const recipe = this.props.recipe;
        recipe.images.splice(identifier, 1);

        this.props.updateRecipe(recipe);
    }

    @Bind
    private tryAddImage(el: React.ChangeEvent<HTMLInputElement>): void {
        if (el.target.files !== null && el.target.files.length > 0) {
            const fr = new FileReader();
            const file = el.target.files[0];
            fr.readAsDataURL(file);

            fr.onload = async(event: ProgressEvent<FileReader>): Promise<void> => {
                if (typeof event.target?.result === 'string') {
                    const success = await this.validate(file, event.target.result);

                    if (success) {
                        const recipe = this.props.recipe;
                        recipe.images.push(event.target.result);

                        this.props.updateRecipe(recipe);
                    }
                }
            };
        }
    }

    private validate(file: File, result: string): Promise<boolean> {
        return new Promise(resolve => {
            const errors = [] as string[];
            const maxMB = 4;
            const minWidth = 1200;
            const minHeight = 800;
            const image = new Image();
            image.src = result;

            image.addEventListener('load', () => {
                if (file.size > maxMB * 1000000) {
                    errors.push('Max filesize is 4MB');
                }

                if (image.height < minHeight || image.width < minWidth) {
                    errors.push(`Image needs to be atleast ${ minWidth }x${ minHeight }`);
                }

                this.setState({ errors });

                if (errors.length) {
                    resolve(false);
                }

                resolve(true);
            });

            image.addEventListener('error', () => {
                resolve(false);
            });
        });
    }
}
