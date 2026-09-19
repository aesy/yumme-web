import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';

@injectable()
export class NameState {
    private name: string = 'Unknown';

    public constructor() {
        makeObservable<NameState, 'name'>(this, {
            name: observable,
            setName: action,
        });
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}
