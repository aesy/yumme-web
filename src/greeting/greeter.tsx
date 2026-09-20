import React, { type ChangeEvent, ReactNode } from 'react';
import { useAtom } from 'jotai';
import { useInjection } from 'inversify-react';
import { nameAtom } from '@/greeting/name-atom';
import { GreetingProvider } from '@/greeting/greeting-provider';
import styles from '@/greeting/greeter.module.scss';

export function Greeter(): ReactNode {
    const greetingProvider = useInjection<GreetingProvider>(GreetingProvider);
    const [name, setName] = useAtom(nameAtom);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    return (
        <div>
            <input className={styles.input} type="text" onChange={onNameChange} value={name} />
            <h1>{greetingProvider.getGreeting(name)}</h1>
        </div>
    );
}
