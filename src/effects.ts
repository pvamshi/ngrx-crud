import { getEntityAction } from './actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {
  ActionCollection,
  LoadAction,
  EntityService,
  AddAction,
  StoreModel,
  EditAction,
  DeleteAction
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
        return this._entityService
          .getEntities<T>(entityName.toLowerCase())
          .map((entities: T[]) =>
            getEntityAction(entityName).getLoadSuccessAction(entities)
          )
          .catch(err => {
            return Observable.of(
              getEntityAction(entityName).getLoadErrorAction(err.data)
            );
          });
      }
      return Observable.of({ type: 'invalid action' });
    });

  @Effect()
  addEntities = this._actions$
    .filter((action: Action) => action.type.match(/^.*\/add$/) !== null)
    .flatMap((action: Action) => {
      const entityName = extractEntityName(/^(.*)\/add$/, action.type);
      if (entityName !== null) {
        return this._entityService
          .addEntity(entityName, (<AddAction<T>>action).payload)
          .map(entity =>
            getEntityAction(entityName).getAddSuccessAction(entity)
          )
          .catch(err => {
            return Observable.of(
              getEntityAction(entityName).getAddErrorAction(err.data)
            );
          });
      }
      return Observable.of({ type: 'invalid action' });
    });

  @Effect()
  editEntity = this._actions$
    .filter((action: Action) => action.type.match(/^.*\/edit$/) !== null)
    .flatMap((action: Action) => {
      const entityName = extractEntityName(/^(.*)\/edit$/, action.type);
      if (entityName !== null) {
        return this._entityService
          .editEntity(entityName, (<EditAction<T>>action).payload)
          .map(entity =>
            getEntityAction(entityName).getEditSuccessAction(entity)
          )
          .catch(err => {
            return Observable.of(
              getEntityAction(entityName).getEditErrorAction(err.data)
            );
          });
      }
      return Observable.empty();
    });
  @Effect()
  deleteEntity = this._actions$
    .filter((action: Action) => action.type.match(/^.*\/delete$/) !== null)
    .flatMap((action: Action) => {
      const entityName = extractEntityName(/^(.*)\/delete$/, action.type);
      if (entityName !== null) {
        return this._entityService
          .deleteEntity(entityName, (<DeleteAction<T>>action).payload)
          .map(entity =>
            getEntityAction(entityName).getDeleteSuccessAction(entity)
          )
          .catch(err => {
            return Observable.of(
              getEntityAction(entityName).getDeleteErrorAction(err.data)
            );
          });
      }
      return Observable.empty();
    });

  constructor(
    private _actions$: Actions,
    private _entityService: EntityService
  ) {}
}
