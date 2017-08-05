import { Action } from '@ngrx/store';
import { Tenant } from '../models';

export const LOAD = '/tenant/load';
export const LOAD_SUCCESS = '/tenant/load/success';
export const ADD = '/tenant/add';
export const ADD_SUCCESS = '/tenant/add/success';
export const EDIT = '/tenant/edit';
export const SELECT = '/tenant/select';
export const DELETE = '/tenant/delete';

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor() {}
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Tenant[]) {}
}
export class AddAction implements Action {
  readonly type = ADD;
  constructor(public payload: Tenant) {}
}
export class AddSuccessAction implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: Tenant) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export class EditAction implements Action {
  readonly type = EDIT;
  constructor(public payload: Tenant) {}
}

export class DeleteAction implements Action {
  readonly type = DELETE;
  constructor(public payload: Tenant) {}
}

export type Actions =
  | LoadAction
  | AddAction
  | EditAction
  | SelectAction
  | DeleteAction
  | AddSuccessAction
  | LoadSuccessAction;
