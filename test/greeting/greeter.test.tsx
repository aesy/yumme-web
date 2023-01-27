import { instance, mock, verify, when } from 'ts-mockito';
import React from 'react';
import { Provider } from 'inversify-react';
import { Container } from 'inversify';
import { render } from '@testing-library/react';
import { NameState } from '@/greeting/name-state';
import { GreetingProvider } from '@/greeting/greeting-provider';
import { Greeter } from '@/greeting/greeter';

describe(Greeter.name, () => {
    test('It should display a greeting', async() => {
        const name = 'Alex';
        const nameState = mock(NameState);
        when(nameState.getName()).thenReturn(name);

        const greeting = 'Hello Alex!';
        const greetingProvider = mock(GreetingProvider);
        when(greetingProvider.getGreeting(name)).thenReturn(greeting);

        const container = new Container();
        container.bind(NameState).toConstantValue(instance(nameState));
        container.bind(GreetingProvider).toConstantValue(instance(greetingProvider));

        const hello = render(
            <Provider container={ container }>
                <Greeter />
            </Provider>,
        );
        const header = hello.getByRole('heading');

        expect(header.textContent).toEqual(greeting);
        verify(nameState.getName()).called();
        verify(greetingProvider.getGreeting(name)).called();
    });
});
