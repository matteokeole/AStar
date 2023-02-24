export default class Slot {
	constructor({position, isObstacle}) {
		/** @type {Vector2} */
		this.position = position;

		/** @type {Boolean} */
		this.isObstacle = isObstacle;
	}
}