import { instance, mock, verify, when } from 'ts-mockito';
import React from 'react';
import { getDefaultStore } from 'jotai';
import { Provider } from 'inversify-react';
import { Container } from 'inversify';
import { render } from '@testing-library/react';
import { nameAtom } from '@/greeting/name-atom';
import { GreetingProvider } from '@/greeting/greeting-provider';
import { Greeter } from '@/greeting/greeter';

describe('Greeter', () => {
    test('It should display a greeting', async () => {
        const name = 'Alex';
        getDefaultStore().set(nameAtom, name);

        const greeting = 'Hello Alex!';
        const greetingProvider = mock(GreetingProvider);
        when(greetingProvider.getGreeting(name)).thenReturn(greeting);

        const container = new Container();
        container.bind(GreetingProvider).toConstantValue(instance(greetingProvider));

        const hello = render(
            <Provider container={container}>
                <Greeter />
            </Provider>,
        );
        const header = hello.getByRole('heading');

        expect(header.textContent).toEqual(greeting);
        verify(greetingProvider.getGreeting(name)).called();
    });
});
