import React, { Component, FocusEvent, ReactNode, RefObject, TextareaHTMLAttributes } from 'react';
import { Bind } from '@decorize/bind';
import styles from '@/common/editable-text.scss';

interface EditableTextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    errors: string[];
    tag: string;
    onKeyDownEnter?(): void;
}

export class EditableText extends Component<EditableTextProps, unknown> {
    private readonly input: RefObject<HTMLTextAreaElement>;

    public constructor(props: EditableTextProps) {
        super(props);
        this.input = React.createRef();
    }

    public componentDidMount(): void {
        this.setHeight();

        this.input.current?.focus();
        this.input.current?.addEventListener('keydown', this.onKeyDownEnter);

        window.addEventListener('resize', this.setHeight);
    }

    public componentWillUnmount(): void {
        this.input.current?.removeEventListener('keydown', this.onKeyDownEnter);

        window.removeEventListener('resize', this.setHeight);
    }

    public render(): ReactNode {
        this.setHeight();
        const { tag, errors, onKeyDownEnter, ...props } = this.props;

        return (
            <div className={ `${ styles.editableText }` }>
                {
                    React.createElement(
                        tag,
                        {
                            className: styles.editWrapper,
                        },
                        <textarea
                            ref={ this.input }
                            className={ `${ styles.textArea } ${ errors.length ? styles.invalid : '' }` }
                            onFocus={ this.onFocus }
                            { ...props } />,
                    )
                }
                {
                    errors.length !== 0 && (
                        <ul className={ styles.errors }>
                            {
                                errors.map((error, j) => (
                                    <li
                                        key={ j }
                                        className={ styles.error }>
                                        <p>
                                            { error }
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        );
    }

    private onFocus(ev: FocusEvent<HTMLTextAreaElement>): void {
        const value = ev.target.value;
        ev.target.setSelectionRange(value.length, value.length);
    }

    @Bind
    private onKeyDownEnter(ev: KeyboardEvent): void {
        const key = ev.key;

        if (key === 'Enter') {
            ev.preventDefault();

            if (this.props.onKeyDownEnter) {
                this.props.onKeyDownEnter();
            }
        }
    }

    @Bind
    private setHeight(): void {
        if (this.input.current) {
            this.input.current.style.height = '0';
            this.input.current.style.height = `${ this.input.current.scrollHeight }px`;
        }
    }
}
