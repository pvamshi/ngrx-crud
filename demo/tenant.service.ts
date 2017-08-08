import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Tenant } from './models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { StoreModel } from '../src';

@Injectable()
export class TenantService {
  private url = 'http://localhost:3000/tenants';
  constructor(private _http: Http) {}

  public getTenants(): Observable<Tenant[]> {
    return this._http.get(this.url).map(res => res.json() as Tenant[]);
  }
  public getEntities(entityName: string): Observable<StoreModel[]> {
    return this._http
      .get(`http://localhost:3000/${entityName}s`)
      .map(res => res.json());
  }

  public addTenant(tenant: Tenant): Observable<Tenant> {
    console.log('tenant add', tenant);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url, tenant).map(res => res.json() as Tenant);
  }
}
