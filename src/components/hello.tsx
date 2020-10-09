import { bind } from '@decorize/bind';
import { resolve } from 'inversify-react';
import { observer } from 'mobx-react';
import React, { ChangeEvent, PureComponent, ReactNode } from 'react';
import { GreetingProvider } from '../services/greeting-provider';
import { NameState } from '../state/nameState';

@observer
export class Hello extends PureComponent {
    @resolve(GreetingProvider)
    private greetingProvider: GreetingProvider;

    @resolve(NameState)
    private nameState: NameState;

    public render(): ReactNode {
        return (
            <div>
                <input type="text"
                       onChange={ this.onNameChange }
                       value={ this.nameState.getName() } />
                <h1>
                    { this.greetingProvider.getGreeting(this.nameState.getName()) }
                </h1>
            </div>
        );
    }

    @bind
    private onNameChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;

        this.nameState.setName(name);
    }
}
