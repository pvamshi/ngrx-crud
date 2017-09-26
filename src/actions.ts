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
export interface DeleteAction<T> extends Action {
  entityName: string;
  payload: T;
}
export interface DeleteSuccessAction<T> extends Action {
  entityName: string;
  payload: T;
}
export interface DeleteErrorAction<T> extends Action {
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
  | EditErrorAction<T>
  | DeleteAction<T>
  | DeleteSuccessAction<T>
  | DeleteErrorAction<T>;
// | SelectAction
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
  DELETE: string;
  DELETE_ERROR: string;
  DELETE_SUCCESS: string;
  SELECT: string;
  getLoadAction(): LoadAction<T>;
  getLoadSuccessAction(payload: T[]): LoadSuccessAction<T>;
  getLoadErrorAction(payload: any): LoadErrorAction<T>;
  getAddAction(payload: T): AddAction<T>;
  getAddSuccessAction(payload: T): AddSuccessAction<T>;
  getAddErrorAction(payload: any): AddErrorAction<T>;
  getEditAction(payload: T): EditAction<T>;
  getEditSuccessAction(payload: T): EditSuccessAction<T>;
  getEditErrorAction(payload: any): EditErrorAction<T>;
  getDeleteAction(payload: T): DeleteAction<T>;
  getDeleteSuccessAction(payload: T): DeleteSuccessAction<T>;
  getDeleteErrorAction(payload: T): DeleteErrorAction<T>;
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
  const DELETE = entityName + '/delete';
  const DELETE_SUCCESS = entityName + '/delete/success';
  const DELETE_ERROR = entityName + '/delete/error';
  const SELECT = entityName + '/select';

  // DELETE
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
  function getDeleteAction(payload: T): DeleteAction<T> {
    return {
      entityName,
      type: DELETE,
      payload: payload
    };
  }
  function getDeleteSuccessAction(payload: T): EditSuccessAction<T> {
    return {
      entityName,
      type: DELETE_SUCCESS,
      payload: payload
    };
  }
  function getDeleteErrorAction(payload: any): EditErrorAction<T> {
    return {
      entityName,
      type: DELETE_ERROR,
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
    DELETE_SUCCESS,
    DELETE_ERROR,
    getAddAction,
    getAddSuccessAction,
    getAddErrorAction,
    getLoadAction,
    getLoadSuccessAction,
    getLoadErrorAction,
    getEditAction,
    getEditSuccessAction,
    getEditErrorAction,
    getDeleteAction,
    getDeleteSuccessAction,
    getDeleteErrorAction
    // EditAction,
    // DeleteAction,
    // SelectAction,
  };
}
