import { Tenant } from './models';
import * as tenant from './tenant/actions';
import * as fromTenant from './tenant/reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State<T> {
  'tenant': fromTenant.State<T>;
}
export const reducer = {
  tenant: fromTenant.reducer,
};
export const getTenantState = createFeatureSelector<fromTenant.State<Tenant>>('tenant');
export const getSelectedTenantId = createSelector(getTenantState, fromTenant.getSelectedId);
export const getTenants = createSelector(getTenantState, fromTenant.getEntities);

function aaa<T>(c: { name: string }) {}
