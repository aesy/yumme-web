import React, { PureComponent, ReactNode } from 'react';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import StarHalfSharpIcon from '@material-ui/icons/StarHalfSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/card.scss';
import { StandardImageInput } from '@/common/standard-image-input';
import { EditableText } from '@/common/editable-text';

interface Props {
    description: string;
    editing: boolean;
    image: string;
    rating: number;
    title: string;

}

interface CardState {
    description: string;
    image: string;
    title: string;
}

export class Card extends PureComponent<Props, CardState> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            description: this.props.description,
            image: this.props.image,
            title: this.props.title,

        };
    }

    public render(): ReactNode {
        const rating = [];

        for (let i = 0; i < this.props.rating - 1; i++) {
            rating.push(<StarSharpIcon />);
        }

        if (this.props.rating - Math.floor(this.props.rating) >= 0.5) {
            rating.push(<StarHalfSharpIcon />);
        }

        if (this.props.editing) {
            return (
                <div className={ `${ styles.card } ${ styles.editing }` }>
                    <div className={ styles.cardImage } style={{ backgroundImage: `url(${ this.state.image })` }}>
                        <StandardImageInput onChange={ this.editImage } color="white" />
                    </div>
                    <div className={ styles.cardContent }>
                        <EditableText
                            placeholder="Title"
                            value={ this.state.title }
                            tag="h1"
                            onChange={ this.editTitleOnChange } />

                        <ul className={ styles.rating }>
                            {
                                rating
                                    .map((star, i) => (
                                        <li key={ i }>
                                            {star}
                                        </li>))
                            }
                        </ul>

                        <EditableText
                            placeholder="Description"
                            value={ this.state.description }
                            tag="p"
                            onChange={ this.editDescriptionOnChange } />
                    </div>
                </div>
            );
        }

        return (
            <div className={ styles.card }>
                <div className={ styles.cardImage } style={{ backgroundImage: `url(${ this.state.image })` }} />
                <div className={ styles.cardContent }>
                    <h1>{this.state.title}</h1>

                    <ul className={ styles.rating }>
                        {
                            rating
                                .map((star, i) => <li key={ i }>{star}</li>)
                        }
                    </ul>

                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }

    @Bind
    private editDescriptionOnChange(value: string): void {
        this.setState({
            description: value,
        });
    }

    @Bind
    private editImage(el: React.ChangeEvent<HTMLInputElement>): void {
        if (el.target.files && el.target.files.length > 0) {
            const image = el.target.files[0];
            const fr = new FileReader();

            fr.onload = (event: ProgressEvent<FileReader>): void => {
                if (typeof event.target?.result === 'string') {
                    this.setState({
                        image: event.target.result,
                    });
                }
            };

            fr.readAsDataURL(image);
        }
    }

    @Bind
    private editTitleOnChange(value: string): void {
        this.setState({
            title: value,
        });
    }
}
