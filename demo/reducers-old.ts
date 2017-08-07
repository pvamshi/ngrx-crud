import { Action } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StoreModel } from '../src';
import {
  Actions,
  LoadSuccessAction,
  AddSuccessAction,
  EditAction,
  ActionCollection,
  getEntityAction
} from './tenant/actions';

export interface State<T> {
  'entity': EntityState<T>;
}
// export const reducer = {
//   tenant: fromTenant.reducer,
// };
const entityState: { [key: string]: any } = {};
const entities: { [key: string]: any } = {};
const actions: { [key: string]: any } = {};

export function getReducer<T extends StoreModel>(c: { name: string }) {
  const entityName = c.name;
  const entityAction: ActionCollection<T> = getEntityAction(c);
  actions[entityName] = entityAction;
  console.log('actions', actions);
  entityState[entityName] = createFeatureSelector<EntityState<T>>(entityName);
  entities[entityName] = createSelector(
    entityState[entityName],
    getStateEntities
  );
  return {
    [entityName]: getStateReducer(entityAction)
  };
}

export function getEntities(c: { name: string }) {
  console.log('entities', entities);
  return entities[c.name];
}

export function getAction(c: { name: string }) {
  return actions[c.name];
}

export interface EntityState<T> {
  entities: T[];
  selectedEntityId: string | number;
}

export function getStateReducer<T extends StoreModel>(
  entityAction: ActionCollection<T>
) {
  return (state = getInitialState<T>(), action: Actions<T>): EntityState<T> => {
    console.log('entityAction', entityAction);
    switch (action.type) {
      case entityAction.LOAD_SUCCESS:
        return {
          entities: (<LoadSuccessAction<T>>action).payload,
          selectedEntityId: state.selectedEntityId
        };
      case entityAction.ADD_SUCCESS:
        return {
          entities: [...state.entities, (<AddSuccessAction<T>>action).payload],
          selectedEntityId: state.selectedEntityId
        };
      case entityAction.EDIT:
        const idx: number = state.entities.findIndex((entity: T) =>
          entity.isEqual((<EditAction<T>>action).payload)
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

function getInitialState<T>(): EntityState<T> {
  return {
    entities: [],
    selectedEntityId: '0'
  };
}
export const getStateEntities = <T>(state: EntityState<T>) => state.entities;

export const getSelectedId = <T>(state: EntityState<T>) =>
  state.selectedEntityId;
