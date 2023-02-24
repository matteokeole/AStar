export default class Renderer {
	constructor(canvas, {scaleMultiplier, backgroundColor}) {
		/** @type {HTMLCanvasElement} */
		this.canvas = canvas;

		/** @type {Number} */
		this.scaleMultiplier = scaleMultiplier;

		/** @type {String} */
		this.backgroundColor = backgroundColor;

		this.canvas.width = this.canvas.height = this.scaleMultiplier * 20;

		/** @type {CanvasRenderingContext2D} */
		this.ctx = canvas.getContext("2d");

		this.ctx.strokeStyle = "#0005";
	}

	/**
	 * @param {Map} map
	 */
	setMap(map) {
		this.canvas.style.backgroundImage = `url(assets/images/${map.backgroundImage})`;
	}

	/**
	 * @param {Node[]} nodes
	 */
	render(nodes) {
		const {ctx, scaleMultiplier: S} = this;

		for (const node of nodes) {
			ctx.fillStyle = node.isPath ? "#97c277" : node.isObstructed ? "#b6424b" : "#0000";

			if (ctx.fillStyle !== "#0000") ctx.fillRect(
				node.position.x * S,
				node.position.y * S,
				S,
				S,
			);

			ctx.strokeRect(
				node.position.x * S,
				node.position.y * S,
				S,
				S,
			);
		}
	}
}