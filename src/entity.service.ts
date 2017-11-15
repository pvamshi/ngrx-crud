import { Injectable, Inject, OpaqueToken, InjectionToken } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from './store-model';
export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
import 'rxjs/add/operator/delay';

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

  public getEntities<T extends StoreModel = StoreModel>(
    entityName: string
  ): Observable<StoreModel[]> {
    return this._http
      .get(`${this.config.apiEndpoint}/${entityName}s`)
      .delay(1000)
      .map(res => res.json());
  }

  public addEntity(
    entityName: string,
    entity: StoreModel
  ): Observable<StoreModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(' am i called here');
    return this._http
      .post(`${this.config.apiEndpoint}/${entityName}s`, entity)
      .map(res => res.json());
  }
  public editEntity(
    entityName: string,
    entity: StoreModel
  ): Observable<StoreModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .put(`${this.config.apiEndpoint}/${entityName}s`, entity)
      .map(res => res.json());
  }
  public deleteEntity(
    entityName: string,
    entity: StoreModel
  ): Observable<StoreModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // return Observable.of(entitiy).delay(1000).map()
    return this._http
      .delete(`${this.config.apiEndpoint}/${entityName}s`)
      .map(res => res.json());
  }
}
