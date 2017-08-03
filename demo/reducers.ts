import { Tenant } from './models';
import * as tenant from './tenant/actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface TenantState {
  ids: string[];
  entities: { [id: string]: Tenant };
  selectedTenantId: string;
}

export const initialState: TenantState = {
  ids: ['0'],
  entities: {
    '0': {
      id: '0',
      name: 'Tenant one'
    }
  },
  selectedTenantId: '0'
};

export function reducer(
  state = initialState,
  action: tenant.Actions
): TenantState {
  switch (action.type) {
    case tenant.ADD: {
      const tenant = action.payload;

      if (state.ids.indexOf(tenant.id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, tenant.id],
        entities: Object.assign({}, state.entities, {
          [tenant.id]: tenant
        }),
        selectedTenantId: state.selectedTenantId
      };
    }

    case tenant.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedTenantId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export const getTenantState = createFeatureSelector<TenantState>('tenant');
export const getEntities = (state: TenantState) => state.entities;

export const getIds = (state: TenantState) => state.ids;

export const getSelectedId = (state: TenantState) => state.selectedTenantId;
export const getEntitiesState = createSelector(getTenantState, getEntities);
export const getSelected = createSelector(
  getEntitiesState,
  getSelectedId,
  (entities, selectedId) => {
    return entities[selectedId];
  }
);

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
