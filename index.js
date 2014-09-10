/**
 * Module dependencies
 */

var update = require('react/addons').addons.update;
var hash = require('object-hash');

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
  this._value = init || {};
};

/**
 * Get a key or the whole value
 *
 * @param {String?} key
 * @param {Any?} defaultValue
 * @return {DirectiveMap}
 */

DirectivMap.prototype.get = function(key, defaultValue) {
  if (arguments.length === 0) return this._value;
  return get(this._value, key, defaultValue);
};

/**
 * Associate a key and value
 *
 * @param {String} key
 * @param {Any} value
 * @return {DirectiveMap}
 */

DirectivMap.prototype.set = function(key, value) {
  var commit = key;
  if (typeof key === 'string') {
    commit = {};
    commit[key] = {$set: value};
  }
  return new DirectivMap(update(this._value, commit));
};

/**
 * Check equality of two maps
 *
 * @param {DirectiveMap}
 * @return {Boolean}
 */

DirectivMap.prototype.equals = function(coll) {
  if (!this._hash) this._hash = hash(this, opts);
  if (!coll._hash) coll._hash = hash(coll, opts);
  return this._hash === coll._hash;
};
var opts = {
  algorithm: 'sha1',
  encoding: 'base64'
};

/**
 * Follow a path and return a value
 *
 * @param {Object|Array} value
 * @param {String} key
 * @param {Any?} defaultValue
 * @return {Any}
 */

function get(value, key, defaultValue) {
  if (key === '') return null;
  var parts = key.split('.');
  return parts.reduce(function(val, part) {
    if (!val) return val;
    return val[part];
  }, value) || defaultValue;
}
