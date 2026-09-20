import React, { FC, InputHTMLAttributes } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import styles from '@/common/standard-image-input.module.scss';

interface StandardImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
    color: 'white' | 'gray';
    errors: string[];
}

export const StandardImageInput: FC<StandardImageInputProps> = ({ color, errors, ...props }) => {
    const input = React.createRef<HTMLInputElement>();

    return (
        <div
            className={styles.standardImageInput}
            role="button"
            tabIndex={0}
            onClick={(): void => input.current?.click()}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    input.current?.click();
                }
            }}
        >
            <input ref={input} type="file" name="img" accept=".bmp, .gif, .png, .tiff" {...props} />
            <IconPhoto className={`${styles.svg} ${styles[color]}`} />
            {errors.length !== 0 && (
                <ul className={styles.errors}>
                    {errors.map((error, i) => (
                        <li className={styles.error} key={i}>
                            {error}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
