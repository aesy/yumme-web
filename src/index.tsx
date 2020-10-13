import '@/globals';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'inversify-react';
import { container } from '@/container';
import { App } from '@/app';

const rootElement = document.getElementById('root');

ReactDOM.render((
    <Provider container={ container }>
        <App />
    </Provider>
), rootElement);
