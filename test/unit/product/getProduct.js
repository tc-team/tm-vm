'use strict';

require('chai').should();

var productService = '../../../lib/vm-api/services/Product';

describe('#getProduct()', function() {
  it('should get product', function(done) {
  	var Product = require(productService);

    Product.getProduct('memo', 'TestUser', function (error, result) {
      result.number.should.equal(3);
      done();
    });
  });
});
