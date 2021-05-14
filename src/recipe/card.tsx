import React, { Component, ReactNode } from 'react';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import StarHalfSharpIcon from '@material-ui/icons/StarHalfSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/card.scss';
import DefaultRecipeImage from '@/images/DefaultRecipeImage.jpg';
import { StandardImageInput } from '@/common/standard-image-input';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.scss';
import { Recipe } from '@/api/yumme-client';

interface CardProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

interface CardState {
    descriptionErrors: string[];
    descriptionInputValue: string;
    imageErrors: string[];
    selectedInput: 'title' | 'description' | null;
    titleErrors: string[];
    titleInputValue: string;
}

export class Card extends Component<CardProps, CardState> {
    public constructor(props: CardProps) {
        super(props);

        this.state = {
            selectedInput: null,
            descriptionErrors: [],
            descriptionInputValue: this.props.recipe.description,
            titleInputValue: this.props.recipe.title,
            titleErrors: [],
            imageErrors: [],
        };
    }

    public render(): ReactNode {
        const rating = [];
        const half = 0.5;

        for (let i = 0; i < this.props.recipe.rating.average; i++) {
            rating.push(<StarSharpIcon />);
        }

        if (this.props.recipe.rating.average - Math.floor(this.props.recipe.rating.average) >= half) {
            rating.push(<StarHalfSharpIcon />);
        }

        if (this.props.editing) {
            return (
                <div className={ `${ styles.card }` }>
                    <div
                        className={ styles.cardImage }
                        style={{
                            backgroundImage: this.props.recipe.images[0]
                                ? `url(${ this.props.recipe.images[0] })`
                                : `url(${ DefaultRecipeImage })`,
                        }}>
                        <StandardImageInput
                            color="white"
                            errors={ this.state.imageErrors }
                            onChange={ this.tryEditImage } />
                    </div>
                    <div className={ styles.cardContent }>
                        {
                            this.state.selectedInput === 'title'
                                ? (
                                    <EditableText
                                        tag="h1"
                                        value={ this.state.titleInputValue }
                                        placeholder="Title"
                                        errors={ this.state.titleErrors }
                                        onKeyDownEnter={ this.deselectInput }
                                        onChange={ this.titleOnChange } />
                                )
                                : (
                                    <div className={ styles.editable } onClick={ (): void => this.selectInput('title') }>
                                        <h1>{ this.props.recipe.title }</h1>
                                        <div className={ `${ editStyles.editButtons } ${ styles.edit }` }>
                                            <EditSharpIcon className={ editStyles.edit } />
                                        </div>
                                    </div>
                                )
                        }

                        <ul className={ styles.rating }>
                            {
                                rating
                                    .map((star, i) => (
                                        <li key={ i }>
                                            { star }
                                        </li>))
                            }
                        </ul>

                        {
                            this.state.selectedInput === 'description'
                                ? (
                                    <EditableText
                                        tag="p"
                                        value={ this.state.descriptionInputValue }
                                        placeholder="Description"
                                        errors={ this.state.descriptionErrors }
                                        onKeyDownEnter={ this.deselectInput }
                                        onChange={ this.descriptionOnChange } />
                                )
                                : (
                                    <div className={ styles.editable }
                                         onClick={ (): void => this.selectInput('description') }>
                                        <p>{ this.props.recipe.description }</p>
                                        <div className={ `${ editStyles.editButtons } ${ styles.edit }` }>
                                            <EditSharpIcon className={ editStyles.edit } />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            );
        }

        return (
            <div className={ styles.card }>
                <div
                    className={ styles.cardImage }
                    style={{
                        backgroundImage: this.props.recipe.images[0]
                            ? `url(${ this.props.recipe.images[0] })`
                            : `url(${ DefaultRecipeImage })`,
                    }} />
                <div className={ styles.cardContent }>
                    <h1>{ this.props.recipe.title }</h1>

                    <ul className={ styles.rating }>
                        {
                            rating.map((star, i) => <li key={ i }>{ star }</li>)
                        }
                    </ul>

                    <p>{ this.props.recipe.description }</p>
                </div>
            </div>
        );
    }

    @Bind
    private descriptionOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ descriptionInputValue: ev.target.value });
    }

    @Bind
    private deselectInput(): void {
        const selectedInput = this.state.selectedInput;

        if (selectedInput === 'title') {
            this.trySaveTitle(() => {
                this.setState({ selectedInput: null });
            });
        }

        if (selectedInput === 'description') {
            this.trySaveDescription(() => {
                this.setState({ selectedInput: null });
            });
        }
    }

    @Bind
    private selectInput(identifier: 'title' | 'description'): void {
        const previousSelectedInput = this.state.selectedInput;

        if (previousSelectedInput === null) {
            this.setState({
                selectedInput: identifier,
            });

            return;
        }

        if (previousSelectedInput === 'title') {
            this.trySaveTitle(() => {
                this.setState({ selectedInput: identifier });
            });
        }

        if (previousSelectedInput === 'description') {
            this.trySaveDescription(() => {
                this.setState({ selectedInput: identifier });
            });
        }
    }

    @Bind
    private titleOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ titleInputValue: ev.target.value });
    }

    @Bind
    private tryEditImage(el: React.ChangeEvent<HTMLInputElement>): void {
        if (el.target.files !== null && el.target.files.length > 0) {
            const fr = new FileReader();
            const file = el.target.files[0];
            fr.readAsDataURL(file);

            fr.onload = async(event: ProgressEvent<FileReader>): Promise<void> => {
                if (typeof event.target?.result === 'string') {
                    const success = await this.validateImage(file, event.target.result);

                    if (success) {
                        const recipe = this.props.recipe;
                        recipe.images[0] = event.target.result;

                        this.props.updateRecipe(recipe);
                    }
                }
            };
        }
    }

    @Bind
    private trySaveDescription(callback: () => void): void {
        const recipe = this.props.recipe;
        const value = this.state.descriptionInputValue;
        const descriptionErrors = this.validateDescription(value);

        this.setState({ descriptionErrors }, () => {
            if (descriptionErrors.length) {
                return;
            }

            recipe.description = value;
            this.props.updateRecipe(recipe);
            callback();
        });
    }

    @Bind
    private trySaveTitle(callback: () => void): void {
        const recipe = this.props.recipe;
        const value = this.state.titleInputValue;
        const titleErrors = this.validateTitle(value);

        this.setState({ titleErrors }, () => {
            if (titleErrors.length) {
                return;
            }

            recipe.title = value;
            this.props.updateRecipe(recipe);
            callback();
        });
    }

    private validateDescription(value: string): string[] {
        const errors: string[] = [];
        const min = 1;
        const max = 512;

        if (value.length < min || value.length > max) {
            errors.push(`Description must be between ${ min } and ${ max } letters.`);
        }

        return errors;
    }

    private validateImage(file: File, result: string): Promise<boolean> {
        return new Promise(resolve => {
            const imageErrors = [] as string[];
            const maxMB = 4;
            const minWidth = 1200;
            const minHeight = 800;
            const image = new Image();
            image.src = result;

            image.addEventListener('load', () => {
                if (file.size > maxMB * 1000000) {
                    imageErrors.push('Max filesize is 4MB');
                }

                if (image.height < minHeight || image.width < minWidth) {
                    imageErrors.push(`Image needs to be at least ${ minWidth }x${ minHeight }`);
                }

                this.setState({ imageErrors });

                if (imageErrors.length) {
                    resolve(false);
                }

                resolve(true);
            });

            image.addEventListener('error', () => {
                resolve(false);
            });
        });
    }

    private validateTitle(value: string): string[] {
        const errors: string[] = [];
        const min = 1;
        const max = 128;

        if (value.length < min || value.length > max) {
            errors.push(`Title must be between ${ min } and ${ max } letters.`);
        }

        return errors;
    }
}
