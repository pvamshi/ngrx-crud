import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreGeneratorModule, getReducers } from '../src';
import { DemoComponent } from './demo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TenantService } from './tenant.service';
import { EffectsModule } from '@ngrx/effects';
// import { getAction, ActionCollection } from './tenant/actions';
import { Tenant, User } from './models';
import { EntityEffects, EntityService, APP_CONFIG } from '../src';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(getReducers([User, Tenant])),
    // StoreModule.forRoot(getReducer(Tenant)),
    StoreDevtoolsModule.instrument({
      maxAge: 25, //  Retains last 25 states
    }),
    EffectsModule.forRoot([EntityEffects]),
    HttpModule,
  ],
  providers: [
    EntityService,
    {
      provide: APP_CONFIG,
      useValue: {
        apiEndpoint: 'http://localhost:3000',
      },
    },
  ],
  // providers: [{ provide: EntityService, useClass: TenantService }],
  bootstrap: [DemoComponent],
})
export class DemoModule {}
