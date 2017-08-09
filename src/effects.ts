import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { getAction, ActionCollection, LoadAction, EntityService } from '.';
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
export class EntityEffects {
  @Effect()
  loadEntities = this._actions$
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

  constructor(
    private _actions$: Actions,
    private _tenantService: EntityService
  ) {}
}
