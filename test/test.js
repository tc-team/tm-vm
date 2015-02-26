'use strict';

describe('SERVICE UNIT:', function() {

  it('should start server without errors', function() {
    return require('../lib/vm-api');
  });

  require('./unit/user/addUser');
  require('./unit/user/getUser');
  require('./unit/user/setUser');
  
  require('./unit/session/addSession');
  require('./unit/session/deleteSession');

  require('./unit/token/createToken');
  require('./unit/token/checkToken');

  require('./unit/product/getProduct');
  
  require('./unit/memo/addMemo');
  require('./unit/memo/getMemos');
  require('./unit/memo/deleteMemo');

});
