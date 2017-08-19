import { NgModule } from '@angular/core';

import { LazyComponent } from './lazy.component';
import { StoreModule } from '@ngrx/store';
import { User } from '../models';
import {
  getReducer,
  EntityEffects,
  EntityService,
  APP_CONFIG
} from '../../src';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LazyComponent
      }
    ]),
    StoreModule.forFeature('user', getReducer(User)),
    EffectsModule.forFeature([EntityEffects])
  ],
  declarations: [LazyComponent],
  providers: [
    EntityService,
    {
      provide: APP_CONFIG,
      useValue: {
        apiEndpoint: 'http://localhost:3000'
      }
    }
  ]
})
export class LazyModule {}
