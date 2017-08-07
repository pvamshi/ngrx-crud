import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Tenant, User } from './models';
// import { tenantAction, userAction } from './demo.module';
import 'rxjs/add/operator/do';
import { TenantService } from './tenant.service';
import { State, getEntities, getAction } from '../src';
@Component({
  selector: 'ngrx-crud-demo-app',
  template: `
    {{users$ | async | json}}
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
  public users$: Observable<User>;
  private tenant: Tenant = {} as Tenant;
  constructor(
    private store: Store<State<User>>,
    private tenantStore: Store<State<Tenant>> // private _tenantService: TenantService
  ) {
    this.users$ = store.select(getEntities(User)).do(console.log);
    this.tenants$ = tenantStore.select(getEntities(Tenant));
  }
  public setId(event: KeyboardEvent) {
    this.tenant.id = (<HTMLInputElement>event.target).value;
  }
  public setName(event: KeyboardEvent) {
    this.tenant.name = (<HTMLInputElement>event.target).value;
  }
  public addTenant() {
    // this.store.dispatch(tenantAction.getAddAction(this.tenant));
  }
  ngOnInit(): void {
    // this.store.dispatch(tenantAction.getLoadAction());
    this.store.dispatch(
      getAction(User).getLoadSuccessAction([
        { id: '0', first: 'fff' } as User,
        { id: '1', first: 'sss' } as User
      ])
    );
    this.tenantStore.dispatch(
      getAction(Tenant).getLoadSuccessAction([{ id: '0', name: 'First' }])
    );
  }
}
