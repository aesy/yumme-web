import React from 'react';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { render } from 'enzyme';
import { instance, mock, verify, when } from 'ts-mockito';
import { Hello } from '../../src/components/hello';
import { GreetingProvider } from '../../src/services/greeting-provider';
import { NameState } from '../../src/state/nameState';

describe('Hello component', () => {
    test('It should display a greeting', () => {
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
                <Hello />
            </Provider>,
        );
        const text = hello.find('h1').text();

        expect(text).toEqual(greeting);
        verify(nameState.getName()).called();
        verify(greetingProvider.getGreeting(name)).called();
    });
});
