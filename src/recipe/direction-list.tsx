import React, { Component, ReactNode } from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/direction-list.scss';
import { EditableText } from '@/common/editable-text';
import editStyles from '@/common/edit.scss';

interface Props {
    directions: string[];
    editing: boolean;
}

interface DirectionListState {
    current: number | null;
    directions: string[];
    newDirection: string;
}

export class DirectionList extends Component<Props, DirectionListState> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            directions: this.props.directions,
            current: null,
            newDirection: '',
        };
    }

    public render(): ReactNode {
        if (this.props.editing) {
            return (
                <ul className={ styles.directions }>
                    {
                        this.state.directions
                            .map((direction, i) => (
                                <li key={ i } data-step={ `STEP ${ i + 1 }` } className={ styles.direction }>
                                    {
                                        this.state.current === i
                                        ? (
                                            <>
                                                <EditableText
                                                    tag="p"
                                                    placeholder=""
                                                    value={ direction }
                                                    onChange={ this.editOnChange } />
                                                <div className={ editStyles.editButtons }>
                                                    <DeleteSharpIcon className={ editStyles.delete } onClick={ (): void => this.delete(i) } />
                                                    <CheckCircleSharpIcon className={ editStyles.save } onClick={ (): void => this.toggleEdit(i) } />
                                                </div>
                                            </>
                                        )
                                        : (
                                            <>
                                                <p>{direction}</p>
                                                <div className={ editStyles.editButtons }>
                                                    <EditSharpIcon className={ editStyles.edit } onClick={ (): void => this.toggleEdit(i) } />
                                                </div>
                                            </>
                                        )
                                    }
                                </li>
                            ))
                    }

                    <li data-step={ `STEP ${ this.state.directions.length + 1 }` } className={ styles.direction }>
                        <EditableText
                            tag="p"
                            value={ this.state.newDirection }
                            onChange={ this.addOnChange }
                            placeholder="Add direction" />
                        <div className={ editStyles.editButtons }>
                            <AddCircleSharpIcon className={ editStyles.add } onClick={ this.add } />
                        </div>
                    </li>
                </ul>
            );
        }

        return (
            <ul className={ styles.directions }>
                {
                    this.state.directions
                        .map((direction, i) => (
                            <li key={ i } data-step={ `STEP ${ i + 1 }` } className={ styles.direction }>
                                <p>{direction}</p>
                            </li>
                        ))
                }
            </ul>
        );
    }

    @Bind
    private add(): void {
        if (this.state.newDirection) {
            this.setState(state => {
                const directions = state.directions.slice();
                directions.push(state.newDirection);

                return {
                    directions,
                    newDirection: '',
                };
            });
        }
    }

    @Bind
    private addOnChange(value: string): void {
        this.setState({
            newDirection: value,
        });
    }

    @Bind
    private delete(identifier: number): void {
        this.setState(state => {
            const directions = state.directions.slice();
            directions.splice(identifier, 1);

            return {
                directions,
                current: null,
            };
        });
    }

    @Bind
    private editOnChange(value: string): void {
        this.setState(state => {
            if (state.current !== null) {
                const directions = state.directions.slice();
                directions[state.current] = value;

                return {
                    directions,
                };
            }

            return null;
        });
    }

    @Bind
    private toggleEdit(identifier: number): void {
        if (this.state.current !== identifier) {
            this.setState({
                current: identifier,
            });
        } else {
            this.setState({
                current: null,
            });
        }
    }
}
