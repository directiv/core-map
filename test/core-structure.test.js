var should = require('should');
var Data = require('../');

describe('core-structure', function() {
  it('should work', function() {
    var data = Data();
    data.get().should.eql({});
    should.not.exist(data.get('key'));
    var data2 = data.set('key', 123);
    should.exist(data2.get('key'));
  });
});
