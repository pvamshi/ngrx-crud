import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreGeneratorModule } from '../src';
import { DemoComponent } from './demo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import * as forTenant from './reducers';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    StoreGeneratorModule.forRoot(),
    StoreModule.forRoot({ tenant: forTenant.reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
