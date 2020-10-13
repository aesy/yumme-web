import { GreetingProvider } from '@/greeting/greeting-provider';

describe(GreetingProvider.name, () => {
    const provider = new GreetingProvider();

    test('It should provide a greeting', () => {
        const name = 'woop';
        const greeting = provider.getGreeting(name);

        expect(greeting).toEqual(`Hello ${ name }!`);
    });
});
