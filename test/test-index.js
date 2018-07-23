/* eslint-disable no-console */

var testsContext = require.context('.', true, /\.spec$/);

testsContext.keys().forEach(function(path) {
  try {
    testsContext(path);
  } catch(err) {
    console.error('[ERROR] WITH SPEC FILE: ' + path);
    console.error(err);
  }
});

/* eslint-enable no-console */
