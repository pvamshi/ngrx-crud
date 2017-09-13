import { Tenant } from './../demo/models';
import { Action } from '@ngrx/store';
import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import { StoreModel, LoadErrorAction, AddErrorAction } from '.';
import { Map } from 'immutable';
import {
  Actions,
  LoadSuccessAction,
  AddSuccessAction,
  EditAction,
  ActionCollection,
  getEntityAction
} from './actions';
import { InjectionToken } from '@angular/core';

export interface State<T> {
  'entity': EntityState<T>;
}
export type Status = {
  [key in 'load' | 'add' | 'edit' | 'delete']: { progress: boolean; error: any }
};

// TODO: Give proper types
const entityState: { [key: string]: any } = {};
const entities: { [key: string]: any } = {};
const actions: { [key: string]: any } = {};
const loadStatus: { [key: string]: any } = {};

// export function getReducers<T extends StoreModel>(cs: { name: string }[]) {
//   const reducer: { [key: string]: any } = {};
//   cs.forEach(c => {
//     const entityName = c.name;
//     const entityAction: ActionCollection<T> = getEntityAction(c);
//     actions[entityName] = entityAction;
//     entityState[entityName] = createFeatureSelector<EntityState<T>>(entityName);
//     entities[entityName] = createSelector(entityState[entityName], getStateEntities);
//     loadStatus[entityName] = createSelector(entityState[entityName], getStateLoadStatus);
//     reducer[entityName] = getStateReducer(entityAction);
//   });
//   return reducer;
// }
// export function getReducer<T extends StoreModel>(c: { name: string }) {
//   // const entityName = c.name;
//   // const entityAction: ActionCollection<T> = getEntityAction(c);
//   // actions[entityName] = entityAction;
//   // entityState[entityName] = createFeatureSelector<EntityState<T>>(entityName);
//   // entities[entityName] = createSelector(entityState[entityName], getStateEntities);
//   // loadStatus[entityName] = createSelector(entityState[entityName], getStateLoadStatus);
//   return getStateReducer();
// }
function init<T>(c: { name: string }) {
  const entityName = c.name;
  const entityAction: ActionCollection<T> = getEntityAction(c);
  actions[entityName] = entityAction;
  entityState[entityName] = createFeatureSelector<EntityState<T>>(entityName);
  entities[entityName] = createSelector(
    entityState[entityName],
    getStateEntities
  );
  loadStatus[entityName] = createSelector(
    entityState[entityName],
    getStateLoadStatus
  );
}
export function getEntities<T>(c: { name: string }) {
  if (!entities[c.name]) {
    init<T>(c);
  }
  return entities[c.name];
}

export function getAction<T>(c: { name: string }) {
  if (!actions[c.name]) {
    init<T>(c);
  }
  return actions[c.name];
}

export function getLoadStatus<T>(c: { name: string }) {
  if (!loadStatus[c.name]) {
    init<T>(c);
  }
  return loadStatus[c.name];
}

export interface EntityState<T> {
  entities: T[] | null;
  selectedEntityId: string | number;
  status: Status;
}

export function getReducer<T extends StoreModel>(ename: string) {
  return function(
    state = getInitialState<T>(),
    action: Actions<T>
  ): EntityState<T> {
    // return (state = getInitialState<T>(), action: Actions<T>): EntityState<T> => {
    const { type } = action;
    switch (type) {
      case ename + '/load':
        const initStatus = state.status;
        initStatus.load.progress = true;
        return {
          entities: state.entities,
          selectedEntityId: state.selectedEntityId,
          status: initStatus
        };
      case ename + '/load/success':
        return {
          entities: (<LoadSuccessAction<T>>action).payload,
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            load: {
              progress: false,
              error: null
            }
          })
        };
      default:
        return state;
    }
  };
}

export function getStateReducer0<T extends StoreModel>(
  state = getInitialState<T>(),
  action: Actions<T>
): EntityState<T> {
  // return (state = getInitialState<T>(), action: Actions<T>): EntityState<T> => {
  console.log('reducer Tenant', state);
  const { entityName, type } = action;
  console.log(entityName, type);
  console.log('--------');
  const params = type.split('/');
  // if (params.length === 2 && params[0] === entityName && params[1] === 'load') {
  if (type === 'Tenant/load') {
    const initStatus = state.status;
    initStatus.load.progress = true;
    return {
      entities: state.entities,
      selectedEntityId: state.selectedEntityId,
      status: initStatus
    };
  } else if (
    // params.length === 3 &&
    // params[0] === entityName &&
    // params[1] === 'load' &&
    // params[2] === 'success'
    type === 'Tenant/load/success'
  ) {
    return {
      entities: (<LoadSuccessAction<T>>action).payload,
      selectedEntityId: state.selectedEntityId,
      status: Object.assign(state.status, {
        load: {
          progress: false,
          error: null
        }
      })
    };
  }
  return state;
}

export function getStateReducer<T extends StoreModel>(
  state = getInitialState<T>(),
  action: Actions<T>
): EntityState<T> {
  // return (state = getInitialState<T>(), action: Actions<T>): EntityState<T> => {
  console.log('reducer Tenant', state);
  const { entityName, type } = action;
  console.log(entityName, type);
  console.log('--------');
  const params = type.split('/');
  // if (params.length === 2 && params[0] === entityName && params[1] === 'load') {
  if (type === 'Tenant/load') {
    const initStatus = state.status;
    initStatus.load.progress = true;
    return {
      entities: state.entities,
      selectedEntityId: state.selectedEntityId,
      status: initStatus
    };
  } else if (
    // params.length === 3 &&
    // params[0] === entityName &&
    // params[1] === 'load' &&
    // params[2] === 'success'
    type === 'Tenant/load/success'
  ) {
    return {
      entities: (<LoadSuccessAction<T>>action).payload,
      selectedEntityId: state.selectedEntityId,
      status: Object.assign(state.status, {
        load: {
          progress: false,
          error: null
        }
      })
    };
  }
  return state;
}

export function getStateReducer2<T extends StoreModel>(
  state = getInitialState<T>(),
  action: Actions<T>
): EntityState<T> {
  // return (state = getInitialState<T>(), action: Actions<T>): EntityState<T> => {
  console.log('reducer User', state);
  const { entityName, type } = action;
  console.log(entityName, type);
  console.log('--------');
  const params = type.split('/');
  // if (params.length === 2 && params[0] === entityName && params[1] === 'load') {
  if (type === 'User/load') {
    const initStatus = state.status;
    initStatus.load.progress = true;
    return {
      entities: state.entities,
      selectedEntityId: state.selectedEntityId,
      status: initStatus
    };
  } else if (
    // params.length === 3 &&
    // params[0] === entityName &&
    // params[1] === 'load' &&
    // params[2] === 'success'
    type === 'User/load/success'
  ) {
    return {
      entities: (<LoadSuccessAction<T>>action).payload,
      selectedEntityId: state.selectedEntityId,
      status: Object.assign(state.status, {
        load: {
          progress: false,
          error: null
        }
      })
    };
  }
  return state;
}

export const reducers = {
  Tenant: getReducer('Tenant'),
  User: getReducer('User')
};
export const reducerToken = new InjectionToken<ActionReducerMap<State<Tenant>>>(
  'Registered Reducers'
);
export const reducerProvider = [
  {
    provide: reducerToken,
    useValue: reducers
  }
];
// switch (action.type) {
//   case entityAction.LOAD:
//   case entityAction.LOAD_SUCCESS:
// case entityAction.LOAD_ERROR:
//   return Object.assign(state, {
//     status: Object.assign(status, {
//       load: {
//         progress: false,
//         error: (<LoadErrorAction<T>>action).payload
//       }
//     })
//   });
// case entityAction.ADD:
//   return {
//     entities: state.entities,
//     selectedEntityId: state.selectedEntityId,
//     status: Object.assign(state.status, {
//       add: {
//         progress: true,
//         error: null
//       }
//     })
//   };
// case entityAction.ADD_SUCCESS:
//   return {
//     entities: [
//       ...(state.entities === null ? [] : state.entities),
//       (<AddSuccessAction<T>>action).payload
//     ],
//     selectedEntityId: state.selectedEntityId,
//     status: Object.assign(state.status, {
//       add: {
//         progress: false,
//         error: null
//       }
//     })
//   };
// case entityAction.ADD_ERROR: {
//   return {
//     entities: state.entities,
//     selectedEntityId: state.selectedEntityId,
//     status: Object.assign(state.status, {
//       add: {
//         progress: false,
//         error: (<AddErrorAction<T>>action).payload
//       }
//     })
//   };
// }
// case entityAction.EDIT:
//   const idx: number =
//     state.entities === null
//       ? -1
//       : state.entities.findIndex((entity: T) =>
//           entity.isEqual((<EditAction<T>>action).payload)
//         );
//   if (idx === -1) {
//     return state;
//   }
//   const temp = [...(state.entities === null ? [] : state.entities)];
//   temp[idx] = (<EditAction<T>>action).payload;
//   return Object.assign(state, { entities: temp });

// case entityAction.DELETE:
//   return Object.assign(state, {
//     aentities: state.entities.filter((tenant: Tenant) => tenant.isEqual((<DeleteAction<Tenant>>action).payload)),a
//   });
// case entityAction.SELECT:
//   return Object.assign(state, {
//     selectedTenantId: action.payload,
//   });
// default: {
//   return state;
// }
// }
// };
function getInitStatus(): Status {
  return {
    load: { progress: false, error: null },
    add: { progress: false, error: null },
    edit: { progress: false, error: null },
    delete: { progress: false, error: null }
  };
}
function getInitialState<T>(): EntityState<T> {
  return {
    entities: null,
    selectedEntityId: '0',
    status: getInitStatus()
  };
}
export const getStateEntities = <T>(state: EntityState<T>) => state.entities;
export const getStateLoadStatus = <T>(state: EntityState<T>) =>
  state.status.load;
export const getStateAddStatus = <T>(state: EntityState<T>) => state.status.add;
export const getStateEditStatus = <T>(state: EntityState<T>) =>
  state.status.edit;
export const getStateDeleteStatus = <T>(state: EntityState<T>) =>
  state.status.delete;

export const getSelectedId = <T>(state: EntityState<T>) =>
  state.selectedEntityId;
