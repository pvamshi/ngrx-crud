import { Action } from '@ngrx/store';
import { StoreModel } from "models";

export function addReducers(models: (new () => StoreModel)[]) {
  const reducers = {};
  for (let index = 0; index < models.length; index++) {
    let callbacks = {};
    const modelName = models[index].name;
    console.log(modelName);
    callbacks[`${modelName}/load`] = (store: any[], payload: any) => store;
    callbacks[`${modelName}/add`] = (store: any[], payload: any) => [...(store ? store : []), payload];
    callbacks[`${modelName}/edit`] = (store: any[], payload: any) => {
      let updatedModelIndex = store.findIndex((model: StoreModel) => model.isEqual(payload));
      if (updatedModelIndex !== -1) {
        const temp = store;
        temp[updatedModelIndex] = payload;
        return temp;
      }
      return store;
    };
    callbacks[`${modelName}/delete`] = (store: any[], payload: StoreModel) => store.filter((model: StoreModel) => model.isEqual(payload));
    console.log(callbacks);
    reducers[modelName] = (store: any[] = null, action: Action) => {
      console.log(action);
      if (!callbacks[action.type]) {
        return;
      }
      return callbacks[action.type](store, action.payload)
    };
  }
  return reducers;
}