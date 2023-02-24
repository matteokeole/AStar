import log from "src/log";

/**
 * @param {Node[]} nodes
 * @param {Node} start
 * @param {Vector2} goal
 * @throws {Error}
 */
export default function pathfind(nodes, start, goal) {
	/** @type {Node[]} */
	const open = [start];

	/** @type {Map<Node, Node>} */
	const path = new Map();

	let u;

	start.gCost = 0;
	start.fCost = start.hCost;

	while (open.length != 0) {
		u = open.sort((a, b) => a.fCost < b.fCost)[0];

		if (u.position.x === goal.x && u.position.y === goal.y) {
			log("Pathfinding done!", "event");

			const finalPath = [u];

			while (path.get(u)) {
				u = path.get(u);

				finalPath.push(u);
			}

			return finalPath;
		};

		open.splice(open.indexOf(u), 1);

		const neighbors = u.getNeighbors(nodes);

		for (const n of neighbors) {
			const gCostTest = u.gCost + u.position.distanceTo(n.position);

			if (gCostTest < n.gCost) {
				// This path to neighbor is better than any previous one. Record it!
				path.set(n, u);
				n.gCost = gCostTest;
				n.fCost = gCostTest + n.hCost;

				if (!open.includes(n)) open.push(n);
			}
		}
	}

	throw Error("Could not pathfind to the goal");
}