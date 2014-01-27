// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {

  //HomePage
  this.root('pages#main');

  //External API
  this.namespace('api', function() {
    this.match('hash_create', 'api#hashCreate', {via: 'post'});
    this.match('hash_verify', 'api#hashVerify', {via: 'post'});

    //Report Endpoints, may move these under Admin section for security purposes
    this.match('hash_audit_stale','api#hashAuditStale', {via: 'get'});
    this.match('hash_audit_invalid','api#hashAuditInvalid', {via: 'get'});

    //Temporary for initial querystring testing
    this.match('hash_create','api#hashCreate', {via: 'get'});
    this.match('hash_verify','api#hashVerify', {via: 'get'});

  });

  //Admin Area
  this.namespace('admin', function() {
    //Admin Index
    this.root('report#index');

    //Admin Reports
    this.match('stale', 'report#stale', {via: 'get'});
    this.match('invalid', 'report#invalid', {via: 'get'});
  });
}
