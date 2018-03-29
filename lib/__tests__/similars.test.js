const assert = require('assert');
const similars = require('../index.js');

const bobs = [
  { fn: 'BOB', ln: 'DYLAN', p: 'Musician' },
  { fn: 'B', ln: 'Marley', p: 'Singer' },
  { fn: 'Bob', ln: 'Dylan', p: 'SINGER' },
  { fn: 'Bobby', ln: 'Dylan', p: 'MUSICIAN' },
  { fn: 'BOB', ln: 'MARLEY', p: 'MUSICIAN' }
];

describe('similars', () => {
  it('requires a matcher function', () => {
    expect.assertions(1);
    return similars(bobs).catch(e =>
      expect(e.message).toBe('matcher function is required')
    );
  });

  it('works', () => {
    return similars(
      bobs,
      (a, b) =>
        a.ln.toLowerCase() === b.ln.toLowerCase() &&
        a.p.toLowerCase() === b.p.toLowerCase()
    ).then(dupes => {
      assert(dupes.length === 2);
    });
  });

  it('calls onEach', () => {
    let counter = 0;
    return similars(
      bobs,
      (a, b) => a.fn === b.fn,
      () => {
        counter++;
      }
    ).then(dupes => {
      assert(counter === 5);
      assert(dupes.length === 2);
    });
  });

  it('works on simple array', () => {
    return similars([1, 2, 3, 2, 1, 1, 1], (a, b) => a === b).then(dupes => {
      assert(dupes.length === 2);
    });
  });
});
