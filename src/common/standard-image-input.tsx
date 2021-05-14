import React, { FC, InputHTMLAttributes } from 'react';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import styles from '@/common/standard-image-input.scss';

interface StandardImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
    color: 'white' | 'gray';
    errors: string[];
}

export const StandardImageInput: FC<StandardImageInputProps> = ({ color, errors, ...props }) => {
    const input = React.createRef<HTMLInputElement>();

    return (
        <div className={ styles.standardImageInput } onClick={ (): void => input.current?.click() }>
            <input ref={ input } type="file" name="img" accept=".bmp, .gif, .png, .tiff" { ...props } />
            <ImageSharpIcon className={ `${ styles.svg } ${ styles[color] }` } />
            {
                errors.length !== 0 && (
                    <ul className={ styles.errors }>
                        {
                            errors.map((error, i) => (
                                <li
                                    className={ styles.error }
                                    key={ i }>
                                    { error }
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
};
