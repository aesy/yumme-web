import React, { Component, ReactNode } from 'react';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/image-list.scss';
import { StandardImageInput } from '@/common/standard-image-input';
import editStyles from '@/common/edit.scss';

interface Props {
    editing: boolean;
    images: string[];
}

interface ImageListState {
    images: string[];
}

export class ImageList extends Component<Props, ImageListState> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            images: this.props.images,
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ `${ styles.images } ${ styles.editing }` }>
                    {
                        this.state.images
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
                            <StandardImageInput onChange={ this.addImage } color="white" />
                        </span>
                    </li>
                </ul>
            );
        }

        return (
            <ul className={ styles.images }>
                {
                    this.state.images
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
    private addImage(el: React.ChangeEvent<HTMLInputElement>): void {
        if (el.target.files !== null && el.target.files.length > 0) {
            const image = el.target.files[0];
            const fr = new FileReader();

            fr.onload = (event: ProgressEvent<FileReader>): void => {
                this.setState(state => {
                    if (typeof event.target?.result === 'string') {
                        const images = state.images.slice();
                        images.push(event.target.result);

                        return {
                            images,
                        };
                    }

                    return state;
                });
            };

            fr.readAsDataURL(image);
        }
    }

    @Bind
    private delete(identifier: number): void {
        this.setState(state => {
            const images = state.images.slice();
            images.splice(identifier, 1);

            return {
                images,
            };
        });
    }
}
