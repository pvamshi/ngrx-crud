import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreGeneratorModule } from '../src';
import { DemoComponent } from './demo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { TenantService } from './tenant.service';
import { TenantEffects } from './tenant/effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    StoreGeneratorModule.forRoot(),
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    EffectsModule.forRoot([TenantEffects]),
    HttpModule
  ],
  providers: [TenantService],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
