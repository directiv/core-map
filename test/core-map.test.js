var should = require('should');
var CoreMap = require('../');

describe('core-map', function() {
  it('should work', function() {
    var data = CoreMap();
    data.get().should.eql({});
    should.not.exist(data.get('key'));
    var data2 = data.set('key', 123);
    should.exist(data2.get('key'));
  });
});
