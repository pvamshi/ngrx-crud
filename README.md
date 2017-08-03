# CRUD generator for ngrx
[![Build Status](https://travis-ci.org/pvamshi/ngrx-crud.svg?branch=master)](https://travis-ci.org/pvamshi/ngrx-crud)
[![codecov](https://codecov.io/gh/pvamshi/ngrx-crud/branch/master/graph/badge.svg)](https://codecov.io/gh/pvamshi/ngrx-crud)
[![npm version](https://badge.fury.io/js/ngrx-crud.svg)](http://badge.fury.io/js/ngrx-crud)
[![devDependency Status](https://david-dm.org/pvamshi/ngrx-crud/dev-status.svg)](https://david-dm.org/pvamshi/ngrx-crud?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/pvamshi/ngrx-crud.svg)](https://github.com/pvamshi/ngrx-crud/issues)
[![GitHub stars](https://img.shields.io/github/stars/pvamshi/ngrx-crud.svg)](https://github.com/pvamshi/ngrx-crud/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/pvamshi/ngrx-crud/master/LICENSE)

## Demo
https://pvamshi.github.io/ngrx-crud/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Generate code for a given model

## Installation

Install through npm:
```
npm install --save ngrx-crud
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { StoreGeneratorModule } from 'ngrx-crud';

@NgModule({
  imports: [
    StoreGeneratorModule.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/pvamshi/ngrx-crud/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/ngrx-crud/bundles/ngrx-crud.umd.js"></script>
<script>
    // everything is exported StoreGeneratorModule namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://pvamshi.github.io/ngrx-crud/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
