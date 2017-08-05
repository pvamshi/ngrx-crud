import { Tenant } from '../models';
import * as tenantAction from './actions';

export interface State {
  entities: Tenant[];
  selectedEntityId: string;
}

const initialState: State = {
  entities: [],
  selectedEntityId: '0'
};

export function reducer(
  state = initialState,
  action: tenantAction.Actions
): State {
  switch (action.type) {
    case tenantAction.LOAD_SUCCESS:
      return {
        entities: action.payload,
        selectedEntityId: state.selectedEntityId
      };
    case tenantAction.ADD_SUCCESS:
      const tenant = action.payload;
      return {
        entities: [...state.entities, action.payload],
        selectedEntityId: state.selectedEntityId
      };
    case tenantAction.EDIT:
      const idx: number = state.entities.findIndex((tenant: Tenant) =>
        tenant.isEqual(action.payload)
      );
      if (idx === -1) {
        return state;
      }
      const temp = [...state.entities];
      temp[idx] = action.payload;
      return Object.assign(state, { entities: temp });
    case tenantAction.DELETE:
      return Object.assign(state, {
        entities: state.entities.filter((tenant: Tenant) =>
          tenant.isEqual(action.payload)
        )
      });
    case tenantAction.SELECT:
      return Object.assign(state, {
        selectedTenantId: action.payload
      });
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedEntityId;
