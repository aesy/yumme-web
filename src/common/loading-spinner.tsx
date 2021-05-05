import React, { FC, InputHTMLAttributes } from 'react';
import styles from '@/common/loading-spinner.scss';

export const LoadingSpinner: FC<unknown> = () => (<div className={ styles.ellipsis }>
<div />
<div />
<div />
<div />
                                                  </div>);

