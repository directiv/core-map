/**
 * Module dependencies
 */

var Immutable = require('immutable').Map;
var inherit = require('util').inherits;

/**
 * Expose the DirectivMap constructor
 */

module.exports = exports = DirectivMap;

/**
 * Create an immutable data structure
 *
 * @param {MoriCollection} init
 */

function DirectivMap(obj) {
  return Immutable.call(this, obj);
};
inherit(DirectivMap, Immutable);

/**
 * Get a key or the whole value
 *
 * @param {String?} key
 * @param {Any?} defaultValue
 * @return {DirectiveMap}
 */

DirectivMap.prototype.getIn = function(searchKeyPath, defaultValue) {
  if (!searchKeyPath || searchKeyPath.length === 0) return this;
  return getInDeepSequence(this, searchKeyPath, defaultValue, 0);
};

var NOT_SET = {};
function getInDeepSequence(seq, keyPath, notSetValue, pathOffset) {
  var key = keyPath[pathOffset];
  var nested = seq.get ? seq.get(keyPath[pathOffset], NOT_SET) : (seq[key] || NOT_SET);
  if (nested === NOT_SET) {
    return notSetValue;
  }
  if (++pathOffset === keyPath.length) {
    return nested;
  }
  return getInDeepSequence(nested, keyPath, notSetValue, pathOffset);
}
