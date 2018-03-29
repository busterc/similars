# similars [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Find similar objects and partial duplicates in collections

## Installation

```sh
$ npm install --save similars
```

## Usage

```js
const similars = require('similars');

const bobs = [
  { fn: 'BOB', ln: 'DYLAN', p: 'Musician' },
  { fn: 'B', ln: 'Marley', p: 'Singer' },
  { fn: 'Bob', ln: 'Dylan', p: 'SINGER' },
  { fn: 'Bobby', ln: 'Dylan', p: 'MUSICIAN' },
  { fn: 'BOB', ln: 'MARLEY', p: 'MUSICIAN' }
];

// Find Bobs with the same last name (ln) and profession (p)
similars(
  bobs,
  (a, b) =>
    a.ln.toLowerCase() === b.ln.toLowerCase() &&
    a.p.toLowerCase() === b.p.toLowerCase()
).then(found => {
  console.log(found);
  /*
    [
      { fn: 'BOB', ln: 'DYLAN', p: 'Musician' },
      { fn: 'Bobby', ln: 'Dylan', p: 'MUSICIAN' }
    ]
  */
});
```

## API

### `similars(collection, matcher[, onEach])`

Returns a `Promise`, however, processing is synchronous

* #### `collection`
  * `Required` : `Array` containing objects
* #### `matcher`
  * `Required` : `Function` that compares each item in the collection and returns a `Boolean`
  * e.g. `(a, b) => a.name.toLowerCase() === b.name.toLowerCase()`
* #### `onEach`
  * `Optional` : `Function` that executes once for each item in the `collection`
  * Is good for showing [progress](https://github.com/visionmedia/node-progress) on long running executions

## License

ISC © [Buster Collings](https://about.me/buster)

[npm-image]: https://badge.fury.io/js/similars.svg
[npm-url]: https://npmjs.org/package/similars
[travis-image]: https://travis-ci.org/busterc/similars.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/similars
[daviddm-image]: https://david-dm.org/busterc/similars.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/similars
[coveralls-image]: https://coveralls.io/repos/busterc/similars/badge.svg
[coveralls-url]: https://coveralls.io/r/busterc/similars
