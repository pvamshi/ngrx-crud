import { StoreModel } from '../src';

export class Tenant implements StoreModel {
  id: string;
  name: string;
  isEqual(otherStore: Tenant): boolean {
    return otherStore.id === this.id;
  }
}

export class User implements StoreModel {
  id: string;
  first: string;
  isEqual(user: User) {
    return user.id === this.id;
  }
}
