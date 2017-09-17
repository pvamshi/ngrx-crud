import { StoreGeneratorModule } from './../src';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComponent } from './demo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreModule,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  Action
} from '@ngrx/store';
import { TenantService } from './tenant.service';
import { EffectsModule } from '@ngrx/effects';
import { Tenant, User } from './models';

// export interface State {
//   'entity': EntityState;
// }
// export interface EntityState {
//   Tenant: TenantState;
//   User: UserState;
// }
// export interface TenantState {
//   tenants: Tenant[];
// }
// export interface UserState {
//   users: User[];
// }

// export const reducerToken = new InjectionToken<ActionReducerMap<State>>(
//   'REDUCER TOKEN'
// );

// export const getEntityState = createFeatureSelector<EntityState>('entity');
// export const getTenantState = createSelector(
//   getEntityState,
//   state => state.Tenant
// );
// export const getTenants = createSelector(
//   getTenantState,
//   state => state && state.tenants
// );
// export const getUserState = createSelector(getEntityState, state => state.User);
// export const getUsers = createSelector(
//   getUserState,
//   state => state && state.users
// );

// export function tenantReducer(
//   state: TenantState = { tenants: [] },
//   action: Action
// ) {
//   return state;
// }
// export function userReducer(state: UserState = { users: [] }, action: Action) {
//   return state;
// }

// export function getReducer() {
//   return {
//     Tenant: tenantReducer,
//     User: userReducer
//   };
// }
// export const tenantReducerToken = new InjectionToken<ActionReducerMap<any>>(
//   'Tenant Registered Reducers'
// );
// export const entities = new InjectionToken<any[]>('ENTITIES');
// export function getReducerr(entities: any[]): ActionReducerMap<any> {
//   console.log('sss');
//   console.log(entities);
//   // const reducers: ActionReducerMap<any> = {};
//   // reducers[Tenant.name] = function(state: any = [], action: Action) {
//   //   return state;
//   // };
//   // return reducers;
//   const red = entities.reduce(
//     (acc: ActionReducerMap<any>, entity: string) =>
//       Object.assign(acc, {
//         [entity]: function(state: any = [], action: Action) {
//           return state;
//         }
//       }),
//     {}
//   );
//   console.log(red);
//   return red;
//   // return {
//   //   Tenant: function(state: any = [], action: Action) {
//   //     return state;
//   //   }
//   // };
// }
export function getEntities() {
  return ['Tenant', 'User'];
}
@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    // StoreModule.forFeature('entity', tenantReducerToken),
    StoreGeneratorModule.forRoot(getEntities),
    StoreDevtoolsModule.instrument(),
    // EffectsModule.forRoot([EntityEffects]),
    HttpModule
  ],
  providers: [
    // EntityService,
    // {
    //   provide: entities,
    //   useFactory: getEntities
    // },
    // {
    //   provide: tenantReducerToken,
    //   deps: [entities],
    //   useFactory: getReducerr
    // }
    // {
    //   provide: userReducerToken,
    //   useValue: userReducer
    // },
    // {
    //   provide: APP_CONFIG,
    //   useValue: {
    //     apiEndpoint: 'http://localhost:3000'
    //   }
    // }
  ],
  // providers: [{ provide: EntityService, useClass: TenantService }],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
