import { Component, OnInit } from '@angular/core';
import * as fromRoot from './reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Tenant } from './models';
import { tenantAction } from './demo.module';
import 'rxjs/add/operator/do';
import { TenantService } from './tenant.service';
@Component({
  selector: 'ngrx-crud-demo-app',
  template: `
    <input type="text" (keyup)="setId($event)" placeholder="id"/>
    <input type="text" (keyup)="setName($event)" placeholder="Tenant Name"/>
    <button type="button" (click)="addTenant()" value="Add">Add </button>
    <hr/>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let tenant of tenants$ | async">
          <td>{{tenant?.id}}</td>
          <td>{{tenant?.name}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ['table td, table th { padding: .5rem 1rem; }']
})
export class DemoComponent implements OnInit {
  public tenants$: Observable<string>;
  private tenant: Tenant = {} as Tenant;
  constructor(
    private store: Store<fromRoot.State>,
    private _tenantService: TenantService
  ) {
    this.tenants$ = store.select(fromRoot.getTenants).do(console.log);
  }
  public setId(event: KeyboardEvent) {
    this.tenant.id = (<HTMLInputElement>event.target).value;
  }
  public setName(event: KeyboardEvent) {
    this.tenant.name = (<HTMLInputElement>event.target).value;
  }
  public addTenant() {
    this.store.dispatch(tenantAction.getAddAction(this.tenant));
  }
  ngOnInit(): void {
    this.store.dispatch(tenantAction.getLoadAction());
  }
}
