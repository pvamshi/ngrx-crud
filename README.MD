# ngrx-crud ( Pre-Alpha stage)

**_Note_** : Still in active development. Limited functionality available.

## Introduction
This library tries to automate CRUD operations related logic while using ngrx. 

**Input** : Model class which implements interface provided in the library, for ex. `User` 

**Output** : 

store with following actions : 
 - User/load 
 - User/add
 - User/edit
 - User/delete

 **Assumptions** 
  - payload for delete and update contains the deleted element or updated element

## Installation 

`npm install --save ngrx-store`

## Consuming this library

### Step 1: Create a Model 

Create a Model ( or more ) which implements `StoreModel` provided by this library: 

```typescript
import { StoreModel } from 'ngrx-crud';

export class User implements StoreModel {
  id: string; // or any other identification param 
  // other params 

  //implement `isEqual` method to compare two models are the same 
  public isEqual(user: User): boolean {
    return this.id === user.id;
  }
}

```

### Step 2: Create Reducers 
```typescript
import { addReducers } from 'ngrx-crud';

// You can add one or more Models in the array provided
export function getReducers(){
   return addReducers([User]);
}

```
This generates a reducer function with all actions mentioned above 

### Step 3: Proceed with ngrx usage as usual 

```typescript

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore(getReducers()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  users : Observable<User[]>;

  private inc = 0;
  constructor(private _store: Store<User>){
    // User.name evauates to 'User' , if not sure just replace 'User' with <Model>.name , here User.name 
    this.tenants = this._store.select('User');
  }

  add(){
    this._store.dispatch({
      type :`User/add`,  // or type: `${User.name}/add`
      payload: {id:++this.inc}
    })
  }
}


```

## TODO 

Its in very infant state, hence has a huge todo list 
  - Clean up the code 
  - Better documentation
  - Support status
  - Add Effects 
  - Provide support for types 
  - Provide a generic Adapter to give server REST information
  - Add support to handle default rest services 
  - Add support to handle firebase by default 
  - Add support to handle AWS Api Gateway by default 




## License

MIT © [Vamshi Krishna Pothuka](mailto:pvamshi@gmail.com)
