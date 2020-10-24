import React, { ChangeEvent, PureComponent, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import { bind } from '@decorize/bind';
import { NameState } from '@/greeting/name-state';
import { GreetingProvider } from '@/greeting/greeting-provider';
import styles from '@/greeting/greeter.scss';

@observer
export class Greeter extends PureComponent {
    @resolve(GreetingProvider)
    private readonly greetingProvider: GreetingProvider;

    @resolve(NameState)
    private readonly nameState: NameState;

    public render(): ReactNode {
        return (
            <div>
                <input className={ styles.input }
                       type="text"
                       onChange={ this.onNameChange }
                       value={ this.nameState.getName() } />
                <h1>
                    { this.greetingProvider.getGreeting(this.nameState.getName()) }
                </h1>
            </div>
        );
    }

    @bind
    private onNameChange(event: ChangeEvent<HTMLInputElement>): void {
        const name = event.target.value;

        this.nameState.setName(name);
    }
}
