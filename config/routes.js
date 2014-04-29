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
    this.match('health','api#health', {via: 'get'});
    this.match('hash_verify', 'api#hashVerify', {via: 'post'});
    this.match('hash_verify','api#hashVerify', {via: 'get'});
  });

  //Admin Area
  this.namespace('admin', function() {
    //Admin Index
    this.root('report#index');
    this.match('hash/:hashId', 'report#hash', {via: 'get'});
    this.namespace('api', function() {
      this.match('stale', 'api#stale', {via: 'get'});
      this.match('invalid', 'api#invalid', {via: 'get'});
      this.match('hashes', 'api#hashes', {via: 'get'});
      this.match('hash/:hashId', 'api#hash', {via: 'get'});
      this.match('acknowledge', 'api#acknowledge', {via: 'get'});
    })
  });
}