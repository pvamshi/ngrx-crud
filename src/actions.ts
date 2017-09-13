import { Action } from '@ngrx/store';

export interface LoadAction<T> extends Action {
  entityName: string;
}
export interface LoadSuccessAction<T> extends Action {
  entityName: string;
  payload: T[];
}

export interface LoadErrorAction<T> extends Action {
  entityName: string;
  payload: any;
}

export interface AddAction<T> extends Action {
  entityName: string;
  payload: T;
}
export interface AddSuccessAction<T> extends Action {
  entityName: string;
  payload: T;
}
export interface AddErrorAction<T> extends Action {
  entityName: string;
  payload: any;
}
export interface EditAction<T> extends Action {
  entityName: string;
  payload: T;
}
export interface EditSuccessAction<T> extends Action {
  entityName: string;
  payload: T;
}
export interface EditErrorAction<T> extends Action {
  entityName: string;
  payload: any;
}
export type Actions<T> =
  | LoadAction<T>
  | LoadSuccessAction<T>
  | LoadErrorAction<T>
  | AddAction<T>
  | AddSuccessAction<T>
  | AddErrorAction<T>
  | EditAction<T>
  | EditSuccessAction<T>
  | EditErrorAction<T>;
// | SelectAction
// | DeleteAction
export interface ActionCollection<T> {
  LOAD: string;
  LOAD_SUCCESS: string;
  LOAD_ERROR: string;
  ADD: string;
  ADD_SUCCESS: string;
  ADD_ERROR: string;
  EDIT: string;
  EDIT_ERROR: string;
  EDIT_SUCCESS: string;
  SELECT: string;
  DELETE: string;
  getLoadAction(): LoadAction<T>;
  getLoadSuccessAction(payload: T[]): LoadSuccessAction<T>;
  getLoadErrorAction(payload: any): LoadErrorAction<T>;
  getAddAction(payload: T): AddAction<T>;
  getAddSuccessAction(payload: T): AddSuccessAction<T>;
  getAddErrorAction(payload: any): AddErrorAction<T>;
  getEditAction(payload: T): EditAction<T>;
  getEditSuccessAction(payload: T): EditSuccessAction<T>;
  getEditErrorAction(payload: any): EditErrorAction<T>;
  // DeleteAction: {  payload: T } & Action;
  // SelectAction: {  payload: T } & Action;
}

export function getEntityAction<T>(c: { name: string }): ActionCollection<T> {
  const { name: entityName } = c;
  const LOAD: string = entityName + '/load';
  const LOAD_SUCCESS = entityName + '/load/success';
  const LOAD_ERROR = entityName + '/load/error';
  const ADD = entityName + '/add';
  const ADD_SUCCESS = entityName + '/add/success';
  const ADD_ERROR = entityName + '/add/error';
  const EDIT = entityName + '/edit';
  const EDIT_SUCCESS = entityName + '/edit/success';
  const EDIT_ERROR = entityName + '/edit/error';
  const SELECT = entityName + '/select';
  const DELETE = entityName + '/delete';

  // class LoadAction implements Action {
  //   readonly type = LOAD;
  //   constructor() {}
  // }

  function getLoadAction(): LoadAction<T> {
    return {
      entityName,
      type: LOAD
    };
  }
  function getLoadSuccessAction(payload: T[]): LoadSuccessAction<T> {
    return {
      entityName,
      type: LOAD_SUCCESS,
      payload: payload
    };
  }
  function getLoadErrorAction(payload: any): LoadSuccessAction<T> {
    return {
      entityName,
      type: LOAD_ERROR,
      payload: payload
    };
  }
  function getAddAction(payload: T): AddAction<T> {
    return {
      entityName,
      type: ADD,
      payload: payload
    };
  }
  function getAddSuccessAction(payload: T): AddSuccessAction<T> {
    return {
      entityName,
      type: ADD_SUCCESS,
      payload: payload
    };
  }
  function getAddErrorAction(payload: any): AddErrorAction<T> {
    return {
      entityName,
      type: ADD_ERROR,
      payload: payload
    };
  }

  function getEditAction(payload: T): EditAction<T> {
    return {
      entityName,
      type: EDIT,
      payload: payload
    };
  }
  function getEditSuccessAction(payload: T): EditSuccessAction<T> {
    return {
      entityName,
      type: EDIT_SUCCESS,
      payload: payload
    };
  }
  function getEditErrorAction(payload: any): EditErrorAction<T> {
    return {
      entityName,
      type: EDIT_ERROR,
      payload: payload
    };
  }
  // class SelectAction implements Action {
  //   readonly type = SELECT;
  //   constructor(public payload: string | number) {}
  // }

  // class EditAction implements Action {
  //   readonly type = EDIT;
  //   constructor(public payload: T) {}
  // }

  // class DeleteAction implements Action {
  //   readonly type = DELETE;
  //   constructor(public payload: T) {}
  // }

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
    LOAD_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    EDIT,
    EDIT_SUCCESS,
    EDIT_ERROR,
    SELECT,
    DELETE,
    getAddAction,
    getAddSuccessAction,
    getAddErrorAction,
    getLoadAction,
    getLoadSuccessAction,
    getLoadErrorAction,
    getEditAction,
    getEditSuccessAction,
    getEditErrorAction
    // EditAction,
    // DeleteAction,
    // SelectAction,
  };
}
