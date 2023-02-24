import Node from "./Node.js";
import Vector2 from "./Vector2.js";

export default class Map {
	constructor({backgroundImage, nodes}) {
		/** @type {String} */
		this.backgroundImage = backgroundImage;

		/** @type {Node[]} */
		this.nodes = nodes;
	}

	/**
	 * Loads and returns a map from a given JSON source.
	 * 
	 * @param {String} source
	 * @returns {Map}
	 */
	static async load(source) {
		const {background_image: backgroundImage, obstacles} = await (await fetch(source)).json();

		return new Map({
			backgroundImage: backgroundImage,
			nodes: Map.createSlots(obstacles),
		});
	}

	/**
	 * @param {Object[]} obstacles
	 * @returns {Node[]}
	 */
	static createSlots(obstacles) {
		/** @type {Node[]} */
		const nodes = [];
		let position, x, y;

		/**
		 * @param {Vector2} position
		 * @returns {Boolean}
		 */
		function isObstacle(position) {
			for (const obstacle of obstacles) {
				const origin = new Vector2(...obstacle.origin);
				const size = origin.add(new Vector2(...obstacle.size));

				if (
					position.x >= origin.x && position.x < size.x &&
					position.y >= origin.y && position.y < size.y
				) return true;
			}

			return false;
		}

		for (x = 0; x < 20; x++) {
			for (y = 0; y < 20; y++) {
				position = new Vector2(x, y);

				nodes.push(new Node({
					position,
					isObstructed: isObstacle(position),
				}));
			}

			y = 0;
		}

		return nodes;
	}
}