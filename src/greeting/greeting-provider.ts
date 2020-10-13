import { injectable } from 'inversify';

@injectable()
export class GreetingProvider {
    public getGreeting(name: string): string {
        return `Hello ${ name }!`;
    }
}
