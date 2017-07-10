import { Action } from '@ngrx/store';

export function addReducers(models) {
  const reducers = {};
  for (let index = 0; index < models.length; index++) {
    let callbacks = {};
    const modelName = models[index];
    callbacks[modelName + 'LOAD'] = (store, payload) => store;
    callbacks[modelName + 'ADD'] = (store, payload) => [...store, payload];
    callbacks[modelName + 'EDIT'] = (store, payload) => store;
    callbacks[modelName + 'DELETE'] = (store, payload) => store;
    reducers[modelName] = (store: any = null, action: Action) => callbacks[action.type](store, action.payload);
  }
  return reducers;
}