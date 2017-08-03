import { Action } from '@ngrx/store';
import { Tenant } from '../models';

export const LOAD = '/tenant/load';
export const ADD = '/tenant/add';
export const SELECT = '/tenant/select';

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: Tenant) {}
}

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public payload: Tenant) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export type Actions = LoadAction | AddAction | SelectAction;
