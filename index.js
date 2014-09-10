/**
 * Module dependencies
 */

var mori = require('mori');

/**
 * Expose the DirectivMap constructor
 */

module.exports = exports = DirectivMap;

/**
 * Create an immutable data structure
 *
 * @param {MoriCollection} init
 */

function DirectivMap(init) {
  if (!(this instanceof DirectivMap)) return new DirectivMap(init);
  this._value = init || mori.hash_map();
};

/**
 * Get a key or the whole value
 *
 * @param {String?} key
 * @param {Any?} defaultValue
 * @return {DirectiveMap}
 */

DirectivMap.prototype.get = function(key, defaultValue) {
  if (arguments.length === 0) return mori.clj_to_js(this._value);
  var value = get(this._value, key, defaultValue);
  if (typeof value !== 'object') return value;
  if (!value) return value;
  return new DirectivMap(value);
};

/**
 * Associate a key and value
 *
 * @param {String} key
 * @param {Any} value
 * @return {DirectiveMap}
 */

DirectivMap.prototype.set = function(key, value) {
  if (typeof value === 'object' && !mori.is_collection(value)) value = mori.js_to_clj(value);
  return new DirectivMap(mori.assoc(this._value, key, value));
};

/**
 * Check equality of two maps
 *
 * @param {DirectiveMap}
 * @return {Boolean}
 */

DirectivMap.prototype.equals = function(coll) {
  return mori.equals(this._value, coll);
};

/**
 * Follow a path and return a value
 *
 * @param {MoriCollection} value
 * @param {String} key
 * @param {Any?} defaultValue
 * @return {Any}
 */

function get(value, key, defaultValue) {
  if (key === '') return null;
  var parts = key.split('.');
  return parts.reduce(function(val, part) {
    if (!val) return val;
    return mori.get(val, part);
  }, value) || defaultValue;
}
