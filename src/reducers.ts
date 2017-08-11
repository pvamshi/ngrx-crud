import { Action } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StoreModel, LoadErrorAction, AddErrorAction } from '../src';
import { Map } from 'immutable';
import {
  Actions,
  LoadSuccessAction,
  AddSuccessAction,
  EditAction,
  ActionCollection,
  getEntityAction,
} from './actions';

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

export function getReducers<T extends StoreModel>(cs: { name: string }[]) {
  const reducer: { [key: string]: any } = {};
  cs.forEach(c => {
    const entityName = c.name;
    const entityAction: ActionCollection<T> = getEntityAction(c);
    actions[entityName] = entityAction;
    entityState[entityName] = createFeatureSelector<EntityState<T>>(entityName);
    entities[entityName] = createSelector(entityState[entityName], getStateEntities);
    loadStatus[entityName] = createSelector(entityState[entityName], getStateLoadStatus);
    reducer[entityName] = getStateReducer(entityAction);
  });
  return reducer;
}

export function getEntities(c: { name: string }) {
  return entities[c.name];
}

export function getAction(c: { name: string }) {
  return actions[c.name];
}

export function getLoadStatus(c: { name: string }) {
  return loadStatus[c.name];
}

export interface EntityState<T> {
  entities: T[];
  selectedEntityId: string | number;
  status: Status;
}

function getStateReducer<T extends StoreModel>(entityAction: ActionCollection<T>) {
  return (state = getInitialState<T>(), action: Actions<T>): EntityState<T> => {
    switch (action.type) {
      case entityAction.LOAD:
        const initStatus = state.status;
        initStatus.load.progress = true;
        return {
          entities: state.entities,
          selectedEntityId: state.selectedEntityId,
          status: initStatus,
        };
      case entityAction.LOAD_SUCCESS:
        return {
          entities: (<LoadSuccessAction<T>>action).payload,
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            load: {
              progress: false,
              error: null,
            },
          }),
        };
      case entityAction.LOAD_ERROR:
        return Object.assign(state, {
          status: Object.assign(status, {
            load: {
              progress: false,
              error: (<LoadErrorAction<T>>action).payload,
            },
          }),
        });
      case entityAction.ADD:
        return {
          entities: state.entities,
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            add: {
              progress: true,
              error: null,
            },
          }),
        };
      case entityAction.ADD_SUCCESS:
        return {
          entities: [...state.entities, (<AddSuccessAction<T>>action).payload],
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            add: {
              progress: false,
              error: null,
            },
          }),
        };
      case entityAction.ADD_ERROR: {
        return {
          entities: state.entities,
          selectedEntityId: state.selectedEntityId,
          status: Object.assign(state.status, {
            add: {
              progress: false,
              error: (<AddErrorAction<T>>action).payload,
            },
          }),
        };
      }
      case entityAction.EDIT:
        const idx: number = state.entities.findIndex((entity: T) =>
          entity.isEqual((<EditAction<T>>action).payload),
        );
        if (idx === -1) {
          return state;
        }
        const temp = [...state.entities];
        temp[idx] = (<EditAction<T>>action).payload;
        return Object.assign(state, { entities: temp });
      // case entityAction.DELETE:
      //   return Object.assign(state, {
      //     aentities: state.entities.filter((tenant: Tenant) => tenant.isEqual((<DeleteAction<Tenant>>action).payload)),a
      //   });
      // case entityAction.SELECT:
      //   return Object.assign(state, {
      //     selectedTenantId: action.payload,
      //   });
      default: {
        return state;
      }
    }
  };
}

function getInitStatus(): Status {
  return {
    load: { progress: false, error: null },
    add: { progress: false, error: null },
    edit: { progress: false, error: null },
    delete: { progress: false, error: null },
  };
}
function getInitialState<T>(): EntityState<T> {
  return {
    entities: [],
    selectedEntityId: '0',
    status: getInitStatus(),
  };
}
export const getStateEntities = <T>(state: EntityState<T>) => state.entities;
export const getStateLoadStatus = <T>(state: EntityState<T>) => state.status.load;
export const getStateAddStatus = <T>(state: EntityState<T>) => state.status.add;
export const getStateEditStatus = <T>(state: EntityState<T>) => state.status.edit;
export const getStateDeleteStatus = <T>(state: EntityState<T>) => state.status.delete;

export const getSelectedId = <T>(state: EntityState<T>) => state.selectedEntityId;
