import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityService, getReducerr } from '.';

export const tenantReducerToken = new InjectionToken<ActionReducerMap<any>>(
  'Tenant Registered Reducers'
);
export const entities = new InjectionToken<any[]>('ENTITIES');

@NgModule({
  // declarations: [HelloWorldComponent],
  imports: [CommonModule, StoreModule.forFeature('entity', tenantReducerToken)]
  // exports: [HelloWorldComponent],
  // providers: [EntityService],
})
export class StoreGeneratorModule {
  static forRoot(getEntities: Function): ModuleWithProviders {
    return {
      ngModule: StoreGeneratorModule,
      providers: [
        {
          provide: entities,
          useFactory: getEntities
        },
        {
          provide: tenantReducerToken,
          deps: [entities],
          useFactory: getReducerr
        }
      ]
    };
  }
}
