import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldComponent } from './hello-world.component';
import { EntityService } from '.';

@NgModule({
  // declarations: [HelloWorldComponent],
  imports: [CommonModule]
  // exports: [HelloWorldComponent],
  // providers: [EntityService],
})
export class StoreGeneratorModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: StoreGeneratorModule,
  //   };
  // }
}
