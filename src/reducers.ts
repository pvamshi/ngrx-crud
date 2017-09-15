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
      case ename + '/load/error':
        return Object.assign(state, {
          status: Object.assign(status, {
            load: {
              progress: false,
              error: (<LoadErrorAction<T>>action).payload
            }
          })
        });
      case ename + '/add':
        return {
          entities: state.entities,
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            add: {
              progress: true,
              error: null
            }
          })
        };
      case ename + '/add/success':
        return {
          entities: [
            ...(state.entities === null ? [] : state.entities),
            (<AddSuccessAction<T>>action).payload
          ],
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            add: {
              progress: false,
              error: null
            }
          })
        };
      case ename + '/add/error':
        return {
          entities: state.entities,
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            add: {
              progress: false,
              error: (<AddErrorAction<T>>action).payload
            }
          })
        };
      default:
        return state;
    }
  };
}

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
