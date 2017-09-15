import { NgModule, InjectionToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComponent } from './demo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { TenantService } from './tenant.service';
import { EffectsModule } from '@ngrx/effects';
// import { getAction, ActionCollection } from './tenant/actions';
import { Tenant, User } from './models';
import {
  EntityEffects,
  EntityService,
  APP_CONFIG,
  getReducer,
  State
} from '../src';

export const tenantReducerToken = new InjectionToken<
  ActionReducerMap<State<Tenant>>
>('Tenant Registered Reducers');
export const userReducerToken = new InjectionToken<
  ActionReducerMap<State<Tenant>>
>('User Registered Reducers');
export const tenantReducer = getReducer('Tenant');
export const userReducer = getReducer('User');
@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    // StoreModule.forRoot({ Tenant: getStateReducer, User: getStateReducer2 }),
    StoreModule.forRoot({}),
    StoreModule.forFeature(Tenant.name, tenantReducerToken),
    StoreModule.forFeature(User.name, userReducerToken),
    // StoreModule.forRoot(getReducers([User, Tenant])),
    // StoreModule.forRoot(getReducer(Tenant)),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    EffectsModule.forRoot([EntityEffects]),
    HttpModule
  ],
  providers: [
    EntityService,
    {
      provide: tenantReducerToken,
      useValue: tenantReducer
    },
    {
      provide: userReducerToken,
      useValue: userReducer
    },
    {
      provide: APP_CONFIG,
      useValue: {
        apiEndpoint: 'http://localhost:3000'
      }
    }
  ],
  // providers: [{ provide: EntityService, useClass: TenantService }],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
