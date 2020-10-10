import { GreetingProvider } from '../../src/services/greeting-provider';

describe('GreetingProvider', () => {
    const provider = new GreetingProvider();

    test('It should provide a greeting', () => {
        const name = 'woop';
        const greeting = provider.getGreeting(name);

        expect(greeting).toEqual(`Hello ${ name }!`);
    });
});
