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
	}

	/**
	 * @param {Map} map
	 */
	render(map) {
		const {canvas, ctx, scaleMultiplier: S} = this;

		canvas.style.backgroundImage = `url(assets/images/${map.backgroundImage})`;

		for (const node of map.nodes) {
			ctx.fillStyle = node.isObstructed ? "#b6424b" : "transparent";
			ctx.fillRect(
				node.position.x * S,
				node.position.y * S,
				S,
				S,
			);
		}
	}
}