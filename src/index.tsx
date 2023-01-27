import '@/globals';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'inversify-react';
import { container } from '@/container';
import { App } from '@/app';

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render((
    <Provider container={ container }>
        <App />
    </Provider>
));
