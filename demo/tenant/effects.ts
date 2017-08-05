import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from './actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { TenantService } from '../tenant.service';
import { Tenant } from '../models';

@Injectable()
export class TenantEffects {
  @Effect()
  addTenants = this._actions$
    .ofType(actions.ADD)
    .map(toPayload)
    .switchMap((tenant: Tenant) => this._tenantService.addTenant(tenant))
    .map(res => new actions.AddSuccessAction(res));

  @Effect()
  loadTenants = this._actions$
    .ofType(actions.LOAD)
    .switchMap(() => this._tenantService.getTenants())
    .do(console.log)
    .map(res => new actions.LoadSuccessAction(res));

  constructor(
    private _actions$: Actions,
    private _tenantService: TenantService
  ) {}
}
