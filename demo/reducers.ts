import { Tenant } from './models';
import * as tenant from './tenant/actions';
import * as fromTenant from './tenant/reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ActionCollection } from './tenant/actions';
import { StoreModel } from '../src';

export interface State<T> {
  'entity': fromTenant.State<T>;
}
// export const reducer = {
//   tenant: fromTenant.reducer,
// };
const entityState: { [key: string]: any } = {};
const entities: { [key: string]: any } = {};
const actions: { [key: string]: any } = {};

export const getTenantState = createFeatureSelector<fromTenant.State<Tenant>>(Tenant.name);

function aaa<T>(c: { name: string }) {}

export function getReducer<T extends StoreModel>(c: { name: string }) {
  const entityName = c.name;
  const entityAction: ActionCollection<T> = tenant.getAction(c);
  actions[entityName] = entityAction;
  entityState[entityName] = createFeatureSelector<fromTenant.State<T>>(entityName);
  entities[entityName] = createSelector(entityState[entityName], fromTenant.getEntities);
  return {
    [entityName]: fromTenant.getReducer(entityAction),
  };
}

export const getSelectedTenantId = createSelector(getTenantState, fromTenant.getSelectedId);
export const getTenants = createSelector(getTenantState, fromTenant.getEntities);

export function getEntities(c: { name: string }) {
  console.log('entities', entities);
  return entities[c.name];
}

export function getAction(c: { name: string }) {
  return actions[c.name];
}
