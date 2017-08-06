import { Action } from '@ngrx/store';

export interface LoadSuccessAction<T> extends Action {
  payload: T[];
}

export interface LoadAction<T> extends Action {}

export interface AddAction<T> extends Action {
  payload: T;
}
export interface EditAction<T> extends Action {
  payload: T;
}
export interface AddSuccessAction<T> extends Action {
  payload: T;
}
export type Actions<T> =
  | LoadAction<T>
  | AddAction<T>
  | EditAction<T>
  // | SelectAction
  // | DeleteAction
  | AddSuccessAction<T>
  | LoadSuccessAction<T>;
export interface ActionCollection<T> {
  LOAD: string;
  LOAD_SUCCESS: string;
  ADD: string;
  ADD_SUCCESS: string;
  EDIT: string;
  // EDIT_SUCCESS: string;
  SELECT: string;
  DELETE: string;
  getLoadAction(): LoadAction<T>;
  getLoadSuccessAction(payload: T[]): LoadSuccessAction<T>;
  getAddAction(payload: T): AddAction<T>;
  getAddSuccessAction(payload: T): AddSuccessAction<T>;
  // EditAction: {  payload: T } & Action;
  // DeleteAction: {  payload: T } & Action;
  // SelectAction: {  payload: T } & Action;
}

export function getAction<T>(c: { name: string }): ActionCollection<T> {
  const { name: entityName } = c;
  const LOAD: string = entityName + '/load';
  const LOAD_SUCCESS = entityName + '/load/success';
  const ADD = entityName + '/add';
  const ADD_SUCCESS = entityName + '/add/success';
  const EDIT = entityName + '/edit';
  const SELECT = entityName + '/select';
  const DELETE = entityName + '/delete';

  // class LoadAction implements Action {
  //   readonly type = LOAD;
  //   constructor() {}
  // }

  function getLoadAction(): LoadAction<T> {
    return {
      type: LOAD,
    };
  }
  function getLoadSuccessAction(payload: T[]): LoadSuccessAction<T> {
    return {
      type: LOAD_SUCCESS,
      payload: payload,
    };
  }
  function getAddAction(payload: T): AddAction<T> {
    return {
      type: ADD,
      payload: payload,
    };
  }
  function getAddSuccessAction(payload: T): AddSuccessAction<T> {
    return {
      type: ADD_SUCCESS,
      payload: payload,
    };
  }

  class SelectAction implements Action {
    readonly type = SELECT;
    constructor(public payload: string | number) {}
  }

  class EditAction implements Action {
    readonly type = EDIT;
    constructor(public payload: T) {}
  }

  class DeleteAction implements Action {
    readonly type = DELETE;
    constructor(public payload: T) {}
  }

  // type Actions =
  //   | LoadAction
  //   | AddAction
  //   | EditAction
  //   | SelectAction
  //   | DeleteAction
  //   | AddSuccessAction
  //   | LoadSuccessAction;

  return {
    LOAD,
    LOAD_SUCCESS,
    ADD,
    ADD_SUCCESS,
    EDIT,
    SELECT,
    DELETE,
    getAddAction,
    getAddSuccessAction,
    getLoadAction,
    getLoadSuccessAction,
    // EditAction,
    // DeleteAction,
    // SelectAction,
  };
}
