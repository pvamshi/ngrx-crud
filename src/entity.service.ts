import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from './store-model';
export let APP_CONFIG = new OpaqueToken('app.config');
import 'rxjs/add/operator/delay';

export interface IAppConfig {
  apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: '/api/',
};
@Injectable()
export class EntityService {
  constructor(private _http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {}

  public getEntities(entityName: string): Observable<StoreModel[]> {
    return this._http
      .get(`${this.config.apiEndpoint}/${entityName}s`)
      .delay(3000)
      .map(res => res.json());
  }

  public addEntity(entityName: string, entity: StoreModel): Observable<StoreModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(`${this.config.apiEndpoint}/${entityName}s`, entity)
      .map(res => res.json());
  }
}
