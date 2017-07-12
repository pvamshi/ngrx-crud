# ngrx-crud

**_Note_** : Still in active development. No where near usable . Any contribution is welcome. 

## Introduction
This library tries to automate CRUD operations related logic while using ngrx. 

**Input** : Store name, for ex. `User` 

**Output** : 

store with following actions : 
 - UserLOAD 
 - UserADD
 - UserEDIT
 - UserDELETE

 **Assumptions** 
  - Model contains `id` as param 
  - payload for delete and update contains the deleted element or updated element


## TODO 

Its in very infant state, hence has a huge todo list 
  - Clean up the code 
  - Better documentation
  - Support status
  - Add Effects 
  - Prevent hardcoding of comparison of models 
  - Provide support for types 
  - Provide a generic Adapter to give server REST information
  - Add support to handle default rest services 
  - Add support to handle firebase by default 
  - Add support to handle AWS Api Gateway by default 


## Installation

To install this library, run:

```bash
$ npm install ngrx-crud --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngrx-crud
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'ngrx-crud';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Vamshi Krishna Pothuka](mailto:pvamshi@gmail.com)
