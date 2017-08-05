import { Tenant } from './models';
import * as tenant from './tenant/actions';
import * as fromTenant from './tenant/reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State {
  'tekkknants': fromTenant.State;
}
export const reducer = {
  tenant: fromTenant.reducer
};
export const getTenantState = createFeatureSelector<fromTenant.State>('tenant');
export const getSelectedTenantId = createSelector(
  getTenantState,
  fromTenant.getSelectedId
);
export const getTenants = createSelector(
  getTenantState,
  fromTenant.getEntities
);
