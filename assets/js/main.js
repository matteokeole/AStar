import {Cockroach} from "./Cockroach.js";
import {log} from "./log.js";

const
	canvas = document.querySelector("#canvas"),
	ctx = canvas.getContext("2d"),
	cockroach_color = "#663d00";

// Set canvas attributes
canvas.width = 400;
canvas.height = 400;
ctx.fillStyle = cockroach_color;

// Place cockroaches
for (let i = 0; i < 2; i++) {
	const cockroach = new Cockroach(ctx, i)
		.spawn(
			Math.floor(20 * Math.random()) * 20,
			Math.floor(20 * Math.random()) * 20,
		)
		.wander();
}

log("Listening for events...", "note");