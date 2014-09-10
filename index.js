/**
 * Module dependencies
 */

var mori = require('mori');

module.exports = exports = DirectivStructure;

function DirectivStructure(init) {
  if (!(this instanceof DirectivStructure)) return new DirectivStructure(init);
  this._value = init || mori.hash_map();
};

DirectivStructure.prototype.get = function(key) {
  if (arguments.length === 0) return mori.clj_to_js(this._value);
  return mori.get(this._value, key);
};

DirectivStructure.prototype.set = function(key, value) {
  if (typeof value === 'object' && !mori.is_collection(value)) value = mori.js_to_clj(value);
  return new DirectivStructure(mori.assoc(this._value, key, value));
};

DirectivStructure.prototype.equals = function(coll) {
  return mori.equals(this._value, coll);
};
