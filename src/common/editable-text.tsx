import React, { Component, ReactNode, RefObject } from 'react';
import { Bind } from '@decorize/bind';
import styles from '@/common/editable-text.scss';

interface EditableTextProps {
    placeholder: string;
    tag: string;
    value: string;

    onChange?(val: string): void;
}

interface EditableTextState {
    value: string;
}

export class EditableText extends Component<EditableTextProps, EditableTextState> {
    private readonly input: RefObject<HTMLTextAreaElement>;

    public constructor(props: EditableTextProps) {
        super(props);

        this.input = React.createRef();
    }

    public componentDidMount(): void {
        this.setHeight();
    }

    public componentDidUpdate(): void {
        this.setHeight();
    }

    public render(): ReactNode {
        return (
            <div className={ `${ styles.editableText }` }>

                {
                    React.createElement(
                        this.props.tag,
                        {
                            className: styles.editWrapper,
                        },
                        <textarea
                            className={ styles.textArea }
                            ref={ this.input }
                            placeholder={ this.props.placeholder }
                            value={ this.props.value }
                            onChange={ this.onChange } />,
                        )
                }
            </div>
        );
    }

    @Bind
    private onChange(el: React.ChangeEvent<HTMLTextAreaElement>): void {
        if (this.props.onChange) {
            this.props.onChange(el.target.value);
        }
    }

    @Bind
    private setHeight(): void {
        if (this.input.current) {
            this.input.current.style.height = '5px';
            this.input.current.style.height = `${ this.input.current.scrollHeight }px`;
        }
    }
}
