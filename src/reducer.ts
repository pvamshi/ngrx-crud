import { Action } from '@ngrx/store';

export function addReducers(models) {
  const reducers = {};
  for (let index = 0; index < models.length; index++) {
    let callbacks = {};
    const modelName = models[index];
    callbacks[modelName + 'LOAD'] = (store: any[], payload: any) => store;
    callbacks[modelName + 'ADD'] = (store: any[], payload: any) => [...store, payload];
    callbacks[modelName + 'EDIT'] = (store: any[], payload: any) => {
      let updatedModelIndex = store.findIndex(model => model.id === payload.id);
      if (updatedModelIndex !== -1) {
        const temp = store;
        temp[updatedModelIndex] = payload;
        return temp;
      }
      return store;
    };
    callbacks[modelName + 'DELETE'] = (store: any[], payload: any) => store.filter(model => model.id !== payload.id);
    reducers[modelName] = (store: any[] = null, action: Action) => callbacks[action.type](store, action.payload);
  }
  return reducers;
}