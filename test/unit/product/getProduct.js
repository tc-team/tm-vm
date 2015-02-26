'use strict';

require('chai').should();

var Product = require('../../../lib/vm-api/services/Product');

describe('Product#getProduct()', function() {
  it('should get product', function(done) {
    Product.getProduct('memo', 'TestUser', function (error, result) {
      result[0].number.should.equal(3);
      done();
    });
  });
});
