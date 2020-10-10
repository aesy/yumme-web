import './globals';
import { Container } from 'inversify';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from './app';

const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
});

const history = createBrowserHistory();
const rootElement = document.getElementById('root');

ReactDOM.render(<App container={ container } history={ history } />, rootElement);
