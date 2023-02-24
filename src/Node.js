export default class Node {
	constructor({position, isObstacle}) {
		/** @type {Vector2} */
		this.position = position;

		/** @type {Boolean} */
		this.isObstructed = isObstacle;
	}
}