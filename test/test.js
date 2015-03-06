'use strict';


describe('SERVICE UNIT:', function() {


  it('should start server without errors', function() {
    return require('../lib/vm-api');
  });

  require('./unit/user');
  
  require('./unit/session');

  require('./unit/token');

  require('./unit/product');

  require('./unit/memo');

});
