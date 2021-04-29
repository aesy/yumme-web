import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';

type Token = string | null;

@injectable()
export class AuthState {
    @observable
    private token: Token = null;

    public constructor() {
        makeObservable(this);
    }

    public getToken(): Token {
        return this.token;
    }

    @action
    public setToken(token: string): void {
        this.token = token;
    }
}