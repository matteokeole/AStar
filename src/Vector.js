/**
 * Generic vector class.
 * 
 * @abstract
 * @throws {TypeError}
 */
export default function Vector(argLength, currentArgLength) {
	if (currentArgLength < argLength) throw TypeError(`Failed to construct '${this.constructor.name}': ${argLength} arguments required, but only ${currentArgLength} present.`);
}

/**
 * @abstract
 * @param {Vector} v
 * @returns {Vector}
 */
Vector.prototype.add = function(v) {};

/**
 * @abstract
 * @param {Number} n
 * @returns {Vector}
 */
Vector.prototype.addScalar = function(n) {};

/**
 * @abstract
 * @returns {Vector}
 */
Vector.prototype.ceil = function() {};

/**
 * @abstract
 * @returns {Vector}
 */
Vector.prototype.clone = function() {};

/**
 * @abstract
 * @param {Vector} v
 * @returns {Number}
 */
Vector.prototype.distanceTo = function(v) {};

/**
 * @abstract
 * @param {Vector} v
 * @returns {Vector}
 * @throws {RangeError}
 */
Vector.prototype.divide = function(v) {};

/**
 * @param {Number} n
 * @throws {RangeError}
 */
Vector.prototype.divideScalar = function(n) {
	if (n === 0) throw RangeError("Division by zero");

	return this.multiplyScalar(1 / n);
};

/**
 * @abstract
 * @param {Vector} v
 * @returns {Number}
 */
Vector.prototype.dot = function(v) {};

/**
 * @abstract
 * @returns {Vector}
 */
Vector.prototype.floor = function() {};

/**
 * Only for 32-bit signed integers.
 * 
 * @abstract
 * @returns {Vector}
 */
Vector.prototype.floor32 = function() {};

Vector.prototype.invert = function() {
	return this.multiplyScalar(-1);
};

Vector.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
};

/**
 * @abstract
 * @returns {Number}
 */
Vector.prototype.lengthSquared = function() {};

/**
 * @param {Vector} v
 * @param {Number} n
 */
Vector.prototype.lerp = function(v, n) {
	const a = this.multiplyScalar(1 - n);
	const b = v.multiplyScalar(n);

	return a.add(b);
};

/**
 * @abstract
 * @param {Vector} v
 * @returns {Vector}
 */
Vector.prototype.multiply = function(v) {};

/**
 * @abstract
 * @param {Number} n
 * @returns {Vector}
 */
Vector.prototype.multiplyScalar = function(n) {};

Vector.prototype.normalize = function() {
	return this.divideScalar(this.length());
};

/**
 * @abstract
 * @returns {Vector}
 */
Vector.prototype.round = function() {};

/**
 * @abstract
 * @param {Vector} v
 * @returns {Vector}
 */
Vector.prototype.substract = function(v) {};

/**
 * @param {Number} n
 */
Vector.prototype.substractScalar = function(n) {
	return this.addScalar(-n);
};

/**
 * @abstract
 * @returns {Number[]}
 */
Vector.prototype.toArray = function() {};