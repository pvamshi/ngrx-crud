import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { Observable } from 'rxjs/Observable';
import { EntityState, getEntities } from '../../src';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lazy-demo',
  template: `
    {{users$ | async | json}}
    `
})
export class LazyComponent implements OnInit {
  public users$: Observable<User>;
  constructor(private store: Store<EntityState<User>>) {
    this.users$ = store.select(getEntities(User));
  }

  ngOnInit() {}
}
