import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Tenant } from './models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class TenantService {
  private url = 'http://localhost:3000/tenants';
  constructor(private _http: Http) {}

  public getTenants(): Observable<Tenant[]> {
    return this._http.get(this.url).map(res => res.json() as Tenant[]);
  }

  public addTenant(tenant: Tenant): Observable<Tenant> {
    console.log('tenant add', tenant);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(this.url, tenant, options)
      .map(res => res.json() as Tenant);
  }
}
