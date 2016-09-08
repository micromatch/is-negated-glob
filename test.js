'use strict';

require('mocha');
var assert = require('assert');
var is = require('./');

describe('is-negated-glob', function() {
  describe('API', function() {
    it('should export a function', function() {
      assert.equal(typeof is, 'function');
    });

    it('should return an object', function() {
      assert(is('foo'));
      assert.equal(typeof is('foo'), 'object');
    });

    it('should expose a negated property', function() {
      assert.equal(typeof is('foo').negated, 'boolean');
    });

    it('should expose an original property', function() {
      assert.equal(typeof is('foo').original, 'string');
      assert.equal(is('foo').original, 'foo');
    });

    it('should expose an pattern property', function() {
      assert.equal(typeof is('foo').pattern, 'string');
    });

    it('should throw an error when invalid args are passed', function(cb) {
      try {
        is();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected a string');
        cb();
      }
    });
  });

  describe('.negated', function() {
    it('should be true when a pattern is negated', function() {
      assert(is('!foo').negated);
    });

    it('should be false when the exclamation is escaped', function() {
      assert(!is('\\!foo').negated);
    });

    it('should be false when a pattern is not negated', function() {
      assert(!is('foo').negated);
    });

    it('should be false when a pattern is an extglob', function() {
      assert(!is('!(foo)').negated);
    });

    it('should be true when first paren is escaped', function() {
      assert(is('!\\(foo)').negated);
    });
  });

  describe('.pattern', function() {
    it('should remove the leading `!` from a pattern', function() {
      assert.equal(is('!foo').pattern, 'foo');
    });

    it('should not remove the leading `!` from an extglob pattern', function() {
      assert.equal(is('!(foo)').pattern, '!(foo)');
      assert(!is('!(foo)').negated);
    });
  });
});
