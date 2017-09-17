import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/take';

import {
  ActionCollection,
  LoadAction,
  EntityService,
  AddAction,
  StoreModel
} from '.';
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
export class EntityEffects<T extends StoreModel> {
  @Effect()
  loadEntities = this._actions$
    .filter((action: Action) => action.type.match(/^.*\/load$/) !== null)
    .flatMap((action: Action) => {
      const entityName = extractEntityName(/^(.*)\/load$/, action.type);
      if (entityName !== null) {
        return this._entityService.getEntities(entityName.toLowerCase());
        // .map(entities =>
        //   getAction({ name: entityName }).getLoadSuccessAction(entities)
        // )
      }
      return Observable.empty();
    });

  @Effect()
  addEntities = this._actions$
    .filter((action: Action) => action.type.match(/^.*\/add$/) !== null)
    .flatMap((action: Action) => {
      const entityName = extractEntityName(/^(.*)\/add$/, action.type);
      if (entityName !== null) {
        return this._entityService.addEntity(
          entityName,
          (<AddAction<T>>action).payload
        );
        // .map(entity =>
        //   getAction({ name: entityName }).getAddSuccessAction(entity)
        // )
      }
      return Observable.empty();
    });

  constructor(
    private _actions$: Actions,
    private _entityService: EntityService
  ) {}
}
