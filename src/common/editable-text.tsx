import React, { FocusEvent, ReactNode, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import styles from '@/common/editable-text.module.scss';

interface EditableTextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    errors: string[];
    tag: string;
    onKeyDownEnter?(): void;
}

export function EditableText(props: EditableTextProps): ReactNode {
    const input = useRef<HTMLTextAreaElement | null>(null);
    const { tag, errors, onKeyDownEnter, ...rest } = props;

    // why: keeps the DOM listener reading the latest callback (matching the
    // class's `this.props.onKeyDownEnter` lookup) without re-attaching it on
    // every render.
    const onKeyDownEnterRef = useRef(onKeyDownEnter);
    onKeyDownEnterRef.current = onKeyDownEnter;

    const setHeight = (): void => {
        if (input.current) {
            input.current.style.height = '0';
            input.current.style.height = `${ input.current.scrollHeight }px`;
        }
    };

    const onFocus = (ev: FocusEvent<HTMLTextAreaElement>): void => {
        const value = ev.target.value;
        ev.target.setSelectionRange(value.length, value.length);
    };

    useEffect(() => {
        const node = input.current;

        const onKeyDownEnterListener = (ev: KeyboardEvent): void => {
            const key = ev.key;

            if (key === 'Enter') {
                ev.preventDefault();

                if (onKeyDownEnterRef.current) {
                    onKeyDownEnterRef.current();
                }
            }
        };

        setHeight();

        node?.focus();
        node?.addEventListener('keydown', onKeyDownEnterListener);

        window.addEventListener('resize', setHeight);

        return () => {
            node?.removeEventListener('keydown', onKeyDownEnterListener);

            window.removeEventListener('resize', setHeight);
        };
    }, []);

    setHeight();

    return (
        <div className={ `${ styles.editableText }` }>
            {
                React.createElement(
                    tag,
                    {
                        className: styles.editWrapper,
                    },
                    <textarea
                        ref={ input }
                        className={ `${ styles.textArea } ${ errors.length ? styles.invalid : '' }` }
                        onFocus={ onFocus }
                        { ...rest } />,
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
