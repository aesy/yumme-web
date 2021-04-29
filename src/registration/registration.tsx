import React, { PureComponent, ReactNode } from 'react';
import styles from '@/registration/registration.scss';
import { RegistrationForm } from './registration-form';

interface RegistrationState {

}

export class Registration extends PureComponent<unknown, RegistrationState> {
	public constructor(props: unknown) {
		super(props);
	}

	public render(): ReactNode {
		return (
			<div className={styles.registration}>
				<h1>LOGO</h1>
				<RegistrationForm />
			</div>
		);
	}
}
