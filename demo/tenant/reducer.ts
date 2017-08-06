import { Tenant } from '../models';
import { tenantAction } from '../demo.module';
import { Action } from '@ngrx/store';
import {
  Actions,
  LoadSuccessAction,
  AddSuccessAction,
  EditAction
} from './actions';

export interface State {
  entities: Tenant[];
  selectedEntityId: string;
}

const initialState: State = {
  entities: [],
  selectedEntityId: '0'
};

export function reducer(state = initialState, action: Actions<Tenant>): State {
  switch (action.type) {
    case tenantAction.LOAD_SUCCESS:
      return {
        entities: (<LoadSuccessAction<Tenant>>action).payload,
        selectedEntityId: state.selectedEntityId
      };
    case tenantAction.ADD_SUCCESS:
      return {
        entities: [
          ...state.entities,
          (<AddSuccessAction<Tenant>>action).payload
        ],
        selectedEntityId: state.selectedEntityId
      };
    case tenantAction.EDIT:
      const idx: number = state.entities.findIndex((tenant: Tenant) =>
        tenant.isEqual((<EditAction<Tenant>>action).payload)
      );
      if (idx === -1) {
        return state;
      }
      const temp = [...state.entities];
      temp[idx] = (<EditAction<Tenant>>action).payload;
      return Object.assign(state, { entities: temp });
    // case tenantAction.DELETE:
    //   return Object.assign(state, {
    //     aentities: state.entities.filter((tenant: Tenant) => tenant.isEqual((<DeleteAction<Tenant>>action).payload)),a
    //   });
    // case tenantAction.SELECT:
    //   return Object.assign(state, {
    //     selectedTenantId: action.payload,
    //   });
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedEntityId;
