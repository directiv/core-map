var should = require('should');
var CoreMap = require('../');

describe('core-map', function() {
  it('should work', function() {
    var data = CoreMap();
    data.get().should.eql({});
    should.not.exist(data.get('key'));
    var data2 = data.set('key', {foo: {bar: 'baz'}});
    var val = data2.get('key');
    should.exist(val);
    val.should.eql({foo: {bar: 'baz'}});
  });

  it('should compare two maps', function() {
    var data = CoreMap();
    var data2 = data.set('key', {foo: {bar: 'baz'}});
    var data3 = data.set('key', {foo: {bar: 'baz'}});
    data2.equals(data3).should.be.ok;
  });
});
