import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import React, { PureComponent, ReactNode } from 'react';
import { Hello } from './components/hello';

export interface AppProps {
    readonly container: Container;
}

export class App extends PureComponent<AppProps> {
    public render(): ReactNode {
        return (
            <Provider container={ this.props.container }>
                <Hello />
            </Provider>
        );
    }
}
