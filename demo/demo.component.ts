import { EntityMainState } from './../src/reducers';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Tenant, User } from './models';
// import { TenantState, UserState, getTenants, getUsers } from './demo.module';
// import { tenantAction, userAction, UserState } from './demo.module';
import 'rxjs/add/operator/do';
import { TenantService } from './tenant.service';
import 'rxjs/add/operator/pluck';
import { getEntities } from '../src';
// import { State, getEntities, getAction, getLoadStatus, Status } from '../src';
@Component({
  selector: 'ngrx-crud-demo-app',
  template: `
    {{users$ | async | json}}
    <input type="text" (keyup)="setId($event)" placeholder="id"/>
    <input type="text" (keyup)="setName($event)" placeholder="Tenant Name"/>
    <hr/>
    <table >
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
  public tenants$: Observable<Tenant[]>;
  public users$: Observable<User[]>;
  private tenant: Tenant = {} as Tenant;
  // public tenantStatus: Status;
  constructor(
    private store: Store<EntityMainState<User>>,
    private tenantStore: Store<EntityMainState<Tenant>>
  ) {
    this.users$ = store.select(getEntities<User>('User'));
    this.tenants$ = tenantStore.select(getEntities<Tenant>(Tenant.name));
    // this.tenants$ = tenantStore.select(getTenants);
    // tenantStore
    //   .select(getLoadStatus<Tenant>(Tenant))
    //   .subscribe((loadStatus: Status) => (this.tenantStatus = loadStatus));
  }
  public setId(event: KeyboardEvent) {
    this.tenant.id = (<HTMLInputElement>event.target).value;
  }
  public setName(event: KeyboardEvent) {
    this.tenant.name = (<HTMLInputElement>event.target).value;
  }
  // public addTenant() {
  //   this.store.dispatch(getAction<Tenant>(Tenant).getAddAction(this.tenant));
  // }
  ngOnInit(): void {
    // this.tenantStore.dispatch(getAction<Tenant>(Tenant).getLoadAction());
    // this.store.dispatch(getAction<User>(User).getLoadAction());
  }
}
