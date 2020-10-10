import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';

@injectable()
export class NameState {
    @observable
    private name = 'Unknown';

    public constructor() {
        makeObservable(this);
    }

    public getName(): string {
        return this.name;
    }

    @action
    public setName(name: string): void {
        this.name = name;
    }
}
