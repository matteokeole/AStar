import {scale} from "./main.js";
import {log} from "./log.js";

/** @type {Number} */
let id = 0;

const directions = ["x", "y"];

export default function Cockroach(map, ctx) {
	/** @type {Number} */
	this.id = ++id;

	// Size
	this.w = 1;
	this.h = 1;

	// Current position
	this.x = 0;
	this.y = 0;

	// Speed value
	this.speed = 100 + Math.floor(100 * Math.random());
	this.speed = 400;

	// Color
	this.color = "#663d00";

	// Map data
	this.map = map;

	// Canvas context
	this.ctx = ctx;
	this.ctx.fillStyle = this.color;

	// Canvas (obtained from context)
	this.canvas = this.ctx.canvas;

	// Border list
	this.border = [
		(this.canvas.width / scale) - 1,
		(this.canvas.height / scale) - 1,
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
	 * Render the cockroach on the map.
	 */
	this.draw = () => this.ctx.fillRect(
		...[this.x, this.y, this.w, this.h].map(i => i * scale),
	);

	/**
	 * Clear the cockroach from the map.
	 */
	this.erase = () => this.ctx.clearRect(
		...[this.x, this.y, this.w, this.h].map(i => i * scale),
	);

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
	 * @param	{number}	x					Destination X
	 * @param	{number}	y					Destination Y
	 * @param	{function}	[callback=Function]	Callback function
	 */
	this.goto = (x, y, callback = Function) => {
		log(`Destination = X: ${x} Y: ${y}`, "note");

		const
			destination = {x: x, y: y},
			interval = setInterval(() => {
				// Clear cockroach old position
				this.erase();

				// Scan obstacles around the current position
				const choices = this.get_choices();
				clearInterval(interval);
				return;
				let choice = choices[Math.floor(Math.random() * choices.length)];
				const scan = this.scan(choice);
				if (!scan) {
					log(`Can't go to X: ${choice[0]} Y: ${choice[1]}: obstacle found.`, "error");
				} else {
					this.x = choice[0];
					this.y = choice[1];

					// Redraw the cockroach
					this.draw();

					log(`Approaching... X: ${this.x} Y: ${this.y}`);

					// Stop if the position is reached
					if (this.x === x && this.y === y) {
						clearInterval(interval);

						log(`Cockroach #${this.id}: Destination reached!`, "event");

						callback();
					}
				}

				// Select a direction to increment
				/*let direction =
					this.x === destination.x ? "y" :
						this.y === destination.y ? "x" :
							directions[Math.floor(2 * Math.random())];*/

				// Update the coordinate towards this direction
				// let attempt = {x: this.x, y: this.y};
				// this[direction] > destination[direction] ? attempt[direction] -= 1 : attempt[direction] += 1;
				// this[direction] = attempt[direction];
			}, this.speed);

		return this;
	};

	this.scan = pos => {
		for (let obstacle of this.map.obstacles) {
			if (
				pos[0] >= obstacle.from[0] &&
				pos[0] <= obstacle.to[0] &&
				pos[1] === obstacle.from[1] &&
				pos[1] <= obstacle.to[1]
			) {
				this.ctx.fillStyle = "#b6424b";
				this.ctx.fillRect(
					obstacle.from[0] * scale,
					obstacle.from[1] * scale,
					(obstacle.to[0] - obstacle.from[0]) * scale,
					(obstacle.to[1] - obstacle.from[1]) * scale,
				);
				this.ctx.fillStyle = this.color;

				return false;
			}
		}

		return true;
	};

	this.get_choices = () => {
		let positions = [
			// [this.x, this.y - 1], // North
			[this.x + 1, this.y], // East
			[this.x, this.y + 1], // South
			// [this.x - 1, this.y], // West
		].filter(i =>
			i[0] >= 0 &&
			i[0] <= this.border[0] &&
			i[1] >= 0 &&
			i[1] <= this.border[1] &&
			!this.map.obstacles.includes(i)
		);

		console.log(positions);
		console.info(this.map.obstacles)

		ctx.fillStyle = "#6d6248";
		for (let p of positions) {
			ctx.fillRect(
				...[...p, 1, 1].map(i => i * scale),
			);
		}
		ctx.fillStyle = this.color;

		return positions;
	};

	this.pathfind = (x, y) => {
		// tracer une ligne de B vers A
		let o = [x, y], // origin
			d = [this.x, this.y]; // destination

		this.ctx.beginPath();
		this.ctx.moveTo((o[0] + .5) * scale, (o[1] + .5) * scale);
		this.ctx.lineTo((d[0] + .5) * scale, (d[1] + .5) * scale);
		this.ctx.strokeStyle = "#ff0";
		this.ctx.stroke();
	};

	return this;
}