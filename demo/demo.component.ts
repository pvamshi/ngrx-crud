import { Component, OnInit } from '@angular/core';
import * as fromTenant from './reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Tenant } from './models';
import * as actions from './tenant/actions';

import 'rxjs/add/operator/do';
export interface State {
  tenant: fromTenant.TenantState;
}
@Component({
  selector: 'ngrx-crud-demo-app',
  template: `
    {{tenant$ | async | json}}
  `
})
export class DemoComponent implements OnInit {
  public tenant$: Observable<Tenant>;
  constructor(private store: Store<State>) {
    this.tenant$ = store.select(fromTenant.getSelected).do(console.log);
  }
  ngOnInit(): void {
    // this.store.dispatch(
    //   new actions.AddAction({
    //     id: '0',
    //     name: 'First',
    //   }),
    // );
  }
}
