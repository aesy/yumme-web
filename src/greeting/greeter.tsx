import React, { type ChangeEvent, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useInjection } from 'inversify-react';
import { NameState } from '@/greeting/name-state';
import { GreetingProvider } from '@/greeting/greeting-provider';
import styles from '@/greeting/greeter.module.scss';

export const Greeter = observer(function Greeter(): ReactNode {
    const greetingProvider = useInjection<GreetingProvider>(GreetingProvider);
    const nameState = useInjection<NameState>(NameState);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.value;

        nameState.setName(name);
    };

    return (
        <div>
            <input className={ styles.input }
                   type="text"
                   onChange={ onNameChange }
                   value={ nameState.getName() } />
            <h1>
                { greetingProvider.getGreeting(nameState.getName()) }
            </h1>
        </div>
    );
});
