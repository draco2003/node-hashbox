module.exports = function() {
  // Any files in this directory will be `require()`'ed when the application
  // starts, and the exported function will be invoked with a `this` context of
  // the application itself.  Initializers are used to connect to databases and
  // message queues, and configure sub-systems such as authentication.

  // Async initializers are declared by exporting `function(done) { /*...*/ }`.
  // `done` is a callback which must be invoked when the initializer is
  // finished.  Initializers are invoked sequentially, ensuring that the
  // previous one has completed before the next one executes.
  var conf = require('nconf')
  , env = process.env.NODE_ENV || 'development';

  conf.add( env , { type: 'file', file: __dirname + '/../../conf/' + env + '.json' });
  conf.add('all', { type: 'file', file: __dirname + '/../../conf/global.json' });

}
