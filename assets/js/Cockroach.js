import {log} from "./log.js";

const directions = ["x", "y"];

/**
 * Create a new cockroach.
 * @param	{object}	ctx		Canvas context of the parent map
 * @param	{number}	[id]	Cockroach unique ID
 */
export const Cockroach = function(ctx, id) {
	// ID
	this.id = id ?? 0;

	// Size
	this.w = 20;
	this.h = 20;

	// Current position
	this.x = 0;
	this.y = 0;

	// Speed value
	this.speed = 100 + Math.floor(100 * Math.random());

	// Canvas context
	this.ctx = ctx;

	// Canvas (obtained from context)
	this.canvas = this.ctx.canvas;

	// Border list
	this.border = [
		this.canvas.width / 20,
		this.canvas.height / 20,
	];

	/**
	 * Draw a cockroach at the given coordinates.
	 * @param	{number}	x	Spawn point X
	 * @param	{number}	y	Spawn point Y
	 */
	this.spawn = (x, y) => {
		this.x = x;
		this.y = y;

		this.draw();

		log(`Cockroach #${this.id} spawned at X: ${this.x} Y: ${this.y}.`, "info");

		return this;
	};

	/**
	 * Make the cockroach wander at random positions on the map and with random chance/delay.
	 */
	this.wander = () => {
		const decision = () => {
			delay = Math.floor(3000 * Math.random());

			log(`Cockroach #${this.id}: Decision made!`, "event");

			this.goto(
				Math.floor(this.border[0] * Math.random()) * this.border[0],
				Math.floor(this.border[1] * Math.random()) * this.border[1],
				() => timeout = setTimeout(decision, delay),
			);
		};
		let delay = Math.floor(3000 * Math.random()),
			timeout = setTimeout(decision, delay);

		return this;
	};

	/**
	 * Make the cockroach go to a specific point on the map.
	 * @param	{number}	x			Destination X
	 * @param	{number}	y			Destination Y
	 * @param	{function}	callback	Callback function
	 */
	this.goto = (x, y, callback) => {
		log(`Destination = X: ${x} Y: ${y}`, "note");

		const
			destination = {x: x, y: y},
			interval = setInterval(() => {
				// Clear cockroach old position
				this.erase();

				// Select a direction to increment
				let direction =
					this.x === destination.x ? "y" :
						this.y === destination.y ? "x" :
							directions[Math.floor(2 * Math.random())];

				// Update the coordinate towards this direction
				this[direction] > destination[direction] ? this[direction] -= 20 : this[direction] += 20;

				// Redraw the cockroach
				this.draw();

				log(`Approaching... X: ${this.x} Y: ${this.y}`);

				// Stop if the position is reached
				if (this.x === x && this.y === y) {
					clearInterval(interval);

					log(`Cockroach #${this.id}: Destination reached!`, "event");

					callback();
				}
			}, this.speed);

		return this;
	};

	/**
	 * Render the cockroach on the map.
	 */
	this.draw = () => this.ctx.fillRect(this.x, this.y, this.w, this.h);

	/**
	 * Clear the cockroach from the map.
	 */
	this.erase = () => this.ctx.clearRect(this.x, this.y, this.w, this.h);

	return this;
};