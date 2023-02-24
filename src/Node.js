export default class Node {
	constructor({position, isObstructed = false, isPath = false}) {
		/** @type {Vector2} */
		this.position = position;

		/** @type {Number} */
		this.fCost = Infinity;

		/** @type {Number} */
		this.gCost = Infinity;

		/** @type {Number} */
		this.hCost = Infinity;

		/** @type {Boolean} */
		this.isObstructed = isObstructed;

		/** @type {Boolean} */
		this.isPath = isPath;
	}

	/**
	 * @param {Node[]} nodes
	 */
	getNeighbors(nodes) {
		/** @type {Node[]} */
		const neighbors = [];

		/** @type {Number} */
		const nodeIndex = nodes.indexOf(this);

		// Left center
		if (this.position.x > 0) neighbors.push(nodes[nodeIndex - 20]);

		// Right center
		if (this.position.x < 19) neighbors.push(nodes[nodeIndex + 20]);

		// Top neighbors
		if (this.position.y > 0) {
			neighbors.push(nodes[nodeIndex - 21]); // Top left
			neighbors.push(nodes[nodeIndex - 1]); // Top center
			neighbors.push(nodes[nodeIndex + 19]); // Top right
		}

		// Bottom neighbors
		if (this.position.y < 19) {
			neighbors.push(nodes[nodeIndex - 19]); // Bottom left
			neighbors.push(nodes[nodeIndex + 1]); // Bottom center
			neighbors.push(nodes[nodeIndex + 21]); // Bottom right
		}

		return neighbors.filter(neighbor => neighbor !== undefined && !neighbor.isObstructed);
	}

	/**
	 * @param {Node} node1
	 * @param {Node} node2
	 * @returns {Number}
	 */
	static compareHeuristic(node1, node2) {
		if (node1.hCost < node2.hCost) return 1;
		if (node1.hCost == node2.hCost) return 0;

		return -1;
	}
}