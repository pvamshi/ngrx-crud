import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreGeneratorModule } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, StoreGeneratorModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
