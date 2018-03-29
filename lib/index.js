'use strict';

module.exports = function(collection, matcher, onEach) {
  return Promise.resolve(true).then(() => {
    if (typeof matcher !== 'function') {
      throw Error('matcher function is required');
    }
    onEach = onEach || function() {};

    let set = new Set();

    return Array.from(
      collection.reduce(
        (cache, current) => {
          onEach();
          let similar;
          let found = cache[0].find(first => {
            similar = [first, current];
            return matcher(first, current);
          });
          if (found) {
            cache[1].add(similar[0]).add(similar[1]);
          } else {
            cache[0].push(current);
          }
          return cache;
        },
        [[], set]
      )[1]
    );
  });
};
