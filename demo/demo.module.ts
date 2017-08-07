import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreGeneratorModule, getReducer } from '../src';
import { DemoComponent } from './demo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TenantService } from './tenant.service';
import { TenantEffects } from './tenant/effects';
import { EffectsModule } from '@ngrx/effects';
// import { getAction, ActionCollection } from './tenant/actions';
import { Tenant, User } from './models';

// export const tenantAction: ActionCollection<Tenant> = getAction(Tenant);
// export const userAction: ActionCollection<User> = getAction(User);
@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    StoreGeneratorModule.forRoot(),
    StoreModule.forRoot(getReducer(User)),
    // StoreModule.forRoot(getReducer(Tenant)),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    // EffectsModule.forRoot([TenantEffects]),
    HttpModule
  ],
  providers: [TenantService],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
