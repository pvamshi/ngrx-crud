import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { TenantService } from '../tenant.service';
import { Tenant } from '../models';

import { tenantAction } from '../demo.module';
@Injectable()
export class TenantEffects {
  @Effect()
  addTenants = this._actions$
    .ofType(tenantAction.ADD)
    .map(toPayload)
    .switchMap((tenant: Tenant) => this._tenantService.addTenant(tenant))
    .map(res => tenantAction.getAddSuccessAction(res));

  @Effect()
  loadTenants = this._actions$
    .ofType(tenantAction.LOAD)
    .switchMap(() => this._tenantService.getTenants())
    .do(console.log)
    .map(res => tenantAction.getLoadSuccessAction(res));

  constructor(
    private _actions$: Actions,
    private _tenantService: TenantService
  ) {}
}
