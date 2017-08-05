import { StoreModel } from '../src';

export interface Tenant extends StoreModel {
  id: string;
  name: string;
}
