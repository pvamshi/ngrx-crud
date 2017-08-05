import { Action } from '@ngrx/store';
import { StoreModel } from '.';

const initStatus = {
  load: null,
  add: null,
  edit: null,
  delete: null
};
type ExtendedAction = { payload: any } & Action;
export function addReducers(
  models: (new () => StoreModel)[],
  initialStore: any = null
) {
  return models.reduce(
    (accumulator: any, model: new () => StoreModel) =>
      Object.assign(
        accumulator,
        addReducerForModel(model.name, initialStore),
        addReducerForModelStatus(model.name)
      ),
    {}
  );
}

function addReducerForModel(modelName: string, initialStore: any) {
  return (store: any[] = initialStore, action: ExtendedAction) => {
    const modelReducer = generateModelReducerMappingObj(modelName);
    const reducerFn = modelReducer[action.type];
    if (reducerFn) {
      return reducerFn(store, action.payload);
    }
  };
}

function addReducerForModelStatus(modelName: string) {
  return (store: any = initStatus, action: ExtendedAction) => {
    const modelStatusReducer = generateModelStatusReducerMappingObj(modelName);
    const reducerFn = modelStatusReducer[action.type];
    if (reducerFn) {
      return reducerFn(store, action.payload);
    }
  };
}

function generateModelStatusReducerMappingObj(modelName: string): any {
  return {
    [`{modelName}/load/start`]: (store: any, payload: any) =>
      Object.assign(store, {
        load: { status: 'inprogress', payload: payload }
      }),
    [`{modelName}/load/error`]: (store: any, payload: any) =>
      Object.assign(store, { load: { status: 'error', payload: payload } }),
    [`{modelName}/load/success`]: (store: any, payload: any) =>
      Object.assign(store, { load: { status: 'done', payload: payload } }),
    [`{modelname}/add/start`]: (store: any, payload: any) =>
      Object.assign(store, { add: { status: 'inprogress', payload: payload } }),
    [`{modelname}/add/error`]: (store: any, payload: any) =>
      Object.assign(store, { add: { status: 'error', payload: payload } }),
    [`{modelname}/add/success`]: (store: any, payload: any) =>
      Object.assign(store, { add: { status: 'done', payload: payload } }),
    [`{modelName}/edit/start`]: (store: any, payload: any) =>
      Object.assign(store, {
        edit: { status: 'inprogress', payload: payload }
      }),
    [`{modelName}/edit/error`]: (store: any, payload: any) =>
      Object.assign(store, { edit: { status: 'error', payload: payload } }),
    [`{modelName}/edit/success`]: (store: any, payload: any) =>
      Object.assign(store, { edit: { status: 'done', payload: payload } }),
    [`{modelName}/delete/start`]: (store: any, payload: any) =>
      Object.assign(store, {
        delete: { status: 'inprogress', payload: payload }
      }),
    [`{modelName}/delete/error`]: (store: any, payload: any) =>
      Object.assign(store, { delete: { status: 'error', payload: payload } }),
    [`{modelName}/delete/success`]: (store: any, payload: any) =>
      Object.assign(store, { delete: { status: 'done', payload: payload } })
  };
}

function generateModelReducerMappingObj(modelName: string): any {
  return {
    [`${modelName}/load`]: (store: any[], payload: any) => store,
    [`${modelName}/add`]: (store: any[], payload: any) => [
      ...(store ? store : []),
      payload
    ],
    [`${modelName}/edit`]: generateModelEditReducer,
    [`${modelName}/delete`]: (store: any[], payload: StoreModel) =>
      store.filter((model: StoreModel) => model.isEqual(payload))
  };
}

function generateModelEditReducer(store: any[], payload: any) {
  let updatedModelIndex = store.findIndex((model: StoreModel) =>
    model.isEqual(payload)
  );
  if (updatedModelIndex !== -1) {
    return Object.assign([], store, { updatedModelIndex, payload });
  }
  return store;
}
