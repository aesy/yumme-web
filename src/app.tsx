import { History } from 'history';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import React, { PureComponent, ReactNode } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Hello } from './components/hello';

export interface AppProps {
    readonly history: History;
    readonly container: Container;
}

export class App extends PureComponent<AppProps> {
    public render(): ReactNode {
        return (
            <Provider container={ this.props.container }>
                <Router history={ this.props.history }>
                    <Switch>
                        <Route path="/" component={ Hello } />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
