import React, { FC } from 'react';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import styles from '@/common/standard-image-input.scss';

interface Props {
    color: 'white' | 'gray';

    onChange(el: React.ChangeEvent<HTMLInputElement>): void;
}


export const StandardImageInput: FC<Props> = props => {
    const input = React.createRef<HTMLInputElement>();

    return (
        <div className={ styles.standardImageInput } onClick={ (): void => input.current?.click() }>
            <input ref={ input } type="file" name="img" accept="image/*" onChange={ props.onChange } />
            <ImageSharpIcon className={ `${ styles.svg } ${ styles[props.color] }` } />
        </div>
    );
};
