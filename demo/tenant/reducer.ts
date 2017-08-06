import { Tenant } from '../models';
import { tenantAction as entityAction } from '../demo.module';
import { Action } from '@ngrx/store';
import { Actions, LoadSuccessAction, AddSuccessAction, EditAction } from './actions';
import { StoreModel } from '../../src';

export interface State<T> {
  entities: T[];
  selectedEntityId: string | number;
}

export function reducer<T extends StoreModel>(
  state = getInitialState<T>(),
  action: Actions<Tenant>,
): State<T> {
  switch (action.type) {
    case entityAction.LOAD_SUCCESS:
      return {
        entities: (<LoadSuccessAction<T>>action).payload,
        selectedEntityId: state.selectedEntityId,
      };
    case entityAction.ADD_SUCCESS:
      return {
        entities: [...state.entities, (<AddSuccessAction<T>>action).payload],
        selectedEntityId: state.selectedEntityId,
      };
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
}

function getInitialState<T>(): State<T> {
  return {
    entities: [],
    selectedEntityId: '0',
  };
}
export const getEntities = <T>(state: State<T>) => state.entities;

export const getSelectedId = <T>(state: State<T>) => state.selectedEntityId;
