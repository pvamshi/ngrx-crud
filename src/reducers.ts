import { Observable } from 'rxjs/Observable';
import {
  Action,
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  MemoizedSelector
} from '@ngrx/store';
import {
  StoreModel,
  LoadErrorAction,
  AddErrorAction,
  EditErrorAction,
  EditSuccessAction,
  DeleteErrorAction,
  DeleteSuccessAction
} from '.';
import {
  Actions,
  LoadSuccessAction,
  AddSuccessAction,
  EditAction,
  ActionCollection,
  getEntityAction,
  SetSelectedEntityAction
} from './actions';
import { InjectionToken } from '@angular/core';
import 'reflect-metadata';

// export interface State<T> {
//   'entity': EntityState<T>;
// }

// // TODO: Give proper types
// const entityState: { [key: string]: any } = {};
// const entities: { [key: string]: any } = {};
// const actions: { [key: string]: any } = {};
// const loadStatus: { [key: string]: any } = {};

// function init<T>(c: { name: string }) {
//   const entityName = c.name;
//   const entityAction: ActionCollection<T> = getEntityAction(c);
//   actions[entityName] = entityAction;
//   entityState[entityName] = createFeatureSelector<EntityState<T>>(entityName);
//   entities[entityName] = createSelector(
//     entityState[entityName],
//     getStateEntities
//   );
//   loadStatus[entityName] = createSelector(
//     entityState[entityName],
//     getStateLoadStatus
//   );
// }
// export function getEntities<T>(c: { name: string }) {
//   if (!entities[c.name]) {
//     init<T>(c);
//   }
//   return entities[c.name];
// }

// export function getAction<T>(c: { name: string }) {
//   if (!actions[c.name]) {
//     init<T>(c);
//   }
//   return actions[c.name];
// }

// export function getLoadStatus<T>(c: { name: string }) {
//   if (!loadStatus[c.name]) {
//     init<T>(c);
//   }
//   return loadStatus[c.name];
// }

// export interface EntityState<T> {
//   entities: T[] | null;
//   selectedEntityId: string | number;
//   status: Status;
// }

// export const getStateEntities = <T>(state: EntityState<T>) => {
//   console.log('getStateEntities', state);
//   return state && state.entities;
// };
// export const getStateLoadStatus = <T>(state: EntityState<T>) => {
//   console.log('getStateLoadStatus', state);
//   return state && state.status && state.status.load;
// };
// // export const getStateAddStatus = <T>(state: EntityState<T>) => state.status.add;
// // export const getStateEditStatus = <T>(state: EntityState<T>) =>
// //   state.status.edit;
// // export const getStateDeleteStatus = <T>(state: EntityState<T>) =>
// //   state.status.delete;

// export const getSelectedId = <T>(state: EntityState<T>) =>
//   state.selectedEntityId;
export function compareEntities(arg1: any, arg2: any) {
  return arg1.id === arg2.id;
}
export type EntityStatus = { progress: boolean; error: any };
export type EntityState = {
  [entityName: string]: EntityMainState<StoreModel>;
};
export const getEntityFeatureState = createFeatureSelector<EntityState>(
  'entity'
);

export const entityState: {
  [key: string]: MemoizedSelector<object, BaseState>;
} = {};

export const entityLoadStatusState: {
  [key: string]: MemoizedSelector<object, EntityStatus>;
} = {};
export const entityAddStatusState: {
  [key: string]: MemoizedSelector<object, EntityStatus>;
} = {};
export const entityEditStatusState: {
  [key: string]: MemoizedSelector<object, EntityStatus>;
} = {};
export const entityDeleteStatusState: {
  [key: string]: MemoizedSelector<object, EntityStatus>;
} = {};
export const entityListState: {
  [key: string]: MemoizedSelector<object, StoreModel[]>;
} = {};

export const entitySelectedIdState: {
  [key: string]: MemoizedSelector<object, string | number | null>;
} = {};

export function getEntityState(entityName: string) {
  if (!entityState[entityName]) {
    entityState[entityName] = createSelector(
      getEntityFeatureState,
      state => state[entityName]
    );
  }
  return entityState[entityName];
}

export function getEntities<T extends StoreModel>(
  entityName: string
): MemoizedSelector<object, T[]> {
  if (!entityListState[entityName]) {
    entityListState[entityName] = createSelector(
      getEntityState(entityName),
      state => <T[]>state.entities
    );
  }
  return entityListState[entityName] as MemoizedSelector<object, T[]>;
}

export function getSelectedEntityId<T extends StoreModel>(
  entityName: string
): MemoizedSelector<object, string | number | null> {
  if (!entitySelectedIdState[entityName]) {
    entitySelectedIdState[entityName] = createSelector(
      getEntityState(entityName),
      state => state.selectedEntityId
    );
  }
  return entitySelectedIdState[entityName];
}

export function getEntityAddStatus(
  entityName: string
): MemoizedSelector<object, EntityStatus> {
  if (!entityAddStatusState[entityName]) {
    entityAddStatusState[entityName] = createSelector(
      getEntityState(entityName),
      state => state.status.add
    );
  }
  return entityAddStatusState[entityName];
}

export function getEntityEditStatus(
  entityName: string
): MemoizedSelector<object, EntityStatus> {
  if (!entityEditStatusState[entityName]) {
    entityEditStatusState[entityName] = createSelector(
      getEntityState(entityName),
      state => state.status.edit
    );
  }
  return entityEditStatusState[entityName];
}

export function getEntityDeleteStatus(
  entityName: string
): MemoizedSelector<object, EntityStatus> {
  if (!entityDeleteStatusState[entityName]) {
    entityDeleteStatusState[entityName] = createSelector(
      getEntityState(entityName),
      state => state.status.delete
    );
  }
  return entityDeleteStatusState[entityName];
}

export function getEntityLoadStatus(
  entityName: string
): MemoizedSelector<object, EntityStatus> {
  if (!entityLoadStatusState[entityName]) {
    entityLoadStatusState[entityName] = createSelector(
      getEntityState(entityName),
      state => state.status.load
    );
  }
  return entityLoadStatusState[entityName];
}

// createSelector(getEntityFeatureState, state => state.);

export function getInitStatus(): Status {
  return {
    load: { progress: false, error: null },
    add: { progress: false, error: null },
    edit: { progress: false, error: null },
    delete: { progress: false, error: null }
  };
}
export function getInitialState<T>(): EntityMainState<T> {
  return {
    entities: null,
    selectedEntityId: null,
    status: getInitStatus()
  };
}
export type Status = {
  [key in 'load' | 'add' | 'edit' | 'delete']: { progress: boolean; error: any }
};
// export interface EntityState {
//   'entity': EntityMainState<StoreModel>;
// }

export interface EntityMainState<T> {
  selectedEntityId: string | number | null;
  entities: T[] | null;
  status: Status;
}
export type BaseState = EntityMainState<StoreModel>;

export function getReducerr(entities: string[]): ActionReducerMap<BaseState> {
  return entities.reduce(
    (acc: ActionReducerMap<BaseState>, entity: string) =>
      Object.assign(acc, {
        [entity]: function(
          state: BaseState = getInitialState<StoreModel>(),
          action: Action
        ): BaseState {
          // return state;

          const { type } = action;
          switch (type) {
            case entity + '/selected':
              return Object.assign({}, state, {
                selectedEntityId: (<SetSelectedEntityAction<StoreModel>>action)
                  .payload
              });
            case entity + '/load':
              const initStatus = state.status;
              initStatus.load.progress = true;
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: initStatus
              };
            case entity + '/load/success':
              return {
                entities: (<LoadSuccessAction<StoreModel>>action).payload,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  load: {
                    progress: false,
                    error: null
                  }
                })
              };
            case entity + '/load/error':
              return Object.assign({}, state, {
                status: Object.assign({}, state.status, {
                  load: {
                    progress: false,
                    error: (<LoadErrorAction<StoreModel>>action).payload
                  }
                })
              });
            case entity + '/add':
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign({}, state.status, {
                  add: {
                    progress: true,
                    error: null
                  }
                })
              };
            case entity + '/add/success':
              return {
                entities: [
                  ...(state.entities === null ? [] : state.entities),
                  (<AddSuccessAction<StoreModel>>action).payload
                ],
                selectedEntityId: state.selectedEntityId,
                status: Object.assign({}, state.status, {
                  add: {
                    progress: false,
                    error: null
                  }
                })
              };
            case entity + '/add/error':
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  add: {
                    progress: false,
                    error: (<AddErrorAction<StoreModel>>action).payload
                  }
                })
              };
            case entity + '/edit':
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  edit: {
                    progress: true,
                    error: null
                  }
                })
              };
            case entity + '/edit/success':
              return {
                entities: (state.entities === null
                  ? []
                  : state.entities).map((entity: StoreModel) => {
                  // TODO: need to fix isEqual is not a function error for following code
                  // return entity.isEqual(
                  //   (<EditSuccessAction<StoreModel>>action).payload
                  // )
                  return compareEntities(
                    entity,
                    (<EditSuccessAction<StoreModel>>action).payload
                  )
                    ? (entity = (<EditSuccessAction<StoreModel>>action).payload)
                    : entity;
                }),
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  edit: {
                    progress: false,
                    error: null
                  }
                })
              };
            case entity + '/edit/error':
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  edit: {
                    progress: false,
                    error: (<EditErrorAction<StoreModel>>action).payload
                  }
                })
              };
            case entity + '/delete':
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  delete: {
                    progress: true,
                    error: null
                  }
                })
              };
            case entity + '/delete/success':
              return {
                entities: (state.entities === null
                  ? []
                  : state.entities).filter((entity: StoreModel) => {
                  // TODO: need to fix isEqual is not a function error for following code
                  // return entity.isEqual((<DeleteSuccessAction<
                  //   StoreModel
                  // >>action).payload)
                  return compareEntities(
                    entity,
                    (<DeleteSuccessAction<StoreModel>>action).payload
                  )
                    ? false
                    : entity;
                }),
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  delete: {
                    progress: false,
                    error: null
                  }
                })
              };
            case entity + '/delete/error':
              return {
                entities: state.entities,
                selectedEntityId: state.selectedEntityId,
                status: Object.assign(state.status, {
                  delete: {
                    progress: false,
                    error: (<DeleteErrorAction<StoreModel>>action).payload
                  }
                })
              };
            default:
              return state;
          }
        }
      }),
    {} as ActionReducerMap<BaseState>
  );
}
