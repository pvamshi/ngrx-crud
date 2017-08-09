import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from './store-model';
export let APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
  apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: '/api/'
};
@Injectable()
export class EntityService {
  constructor(
    private _http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  public getEntities(entityName: string): Observable<StoreModel[]> {
    console.log('public service', this.config);
    return this._http
      .get(`${this.config.apiEndpoint}/${entityName}s`)
      .map(res => res.json());
  }
}
