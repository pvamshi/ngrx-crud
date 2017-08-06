import { StoreModel } from '../src';

export class Tenant implements StoreModel {
  isEqual(otherStore: Tenant): boolean {
    return otherStore.id === this.id;
  }
  id: string;
  name: string;
}

export class User implements StoreModel {
  id: string;
  first: string;
  isEqual(user: User) {
    return user.id === this.id;
  }
}
