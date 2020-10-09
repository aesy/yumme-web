import 'reflect-metadata';
import 'normalize.css';

import { Container } from 'inversify';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
});

const rootElement = document.getElementById('root');

ReactDOM.render(<App container={ container } />, rootElement);
