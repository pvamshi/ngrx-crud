import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { TenantService } from '../tenant.service';
import { Tenant } from '../models';

// import { tenantAction } from '../demo.module';
import { getAction, ActionCollection, LoadAction } from '../../src';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

function extractEntityName(reg: RegExp, value: string): string | null {
  const results = reg.exec(value);
  if (results === null || results.length < 2) {
    return null;
  }
  return results[1];
}
@Injectable()
export class TenantEffects {
  // private _tenantAction: ActionCollection<Tenant>;
  @Effect()
  addTenants = this._actions$
    .filter((action: Action) => action.type.match(/^.*\/load$/) !== null)
    .flatMap((action: Action) => {
      const entityName = extractEntityName(/^(.*)\/load$/, action.type);
      if (entityName !== null) {
        return this._tenantService
          .getEntities(entityName.toLowerCase())
          .map(entities =>
            getAction({ name: entityName }).getLoadSuccessAction(entities)
          );
      }
      return Observable.empty();
    });

  // @Effect()
  // loadTenants = this._actions$
  //   .ofType(this._tenantAction.LOAD)
  //   .switchMap(() => this._tenantService.getTenants())
  //   .do(console.log)
  //   .map(res => this._tenantAction.getLoadSuccessAction(res));

  constructor(
    private _actions$: Actions,
    private _tenantService: TenantService
  ) {
    // this._tenantAction = getAction(Tenant);
  }
}
