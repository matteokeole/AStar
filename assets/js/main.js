import {Cockroach} from "./Cockroach.js";
import {load_map} from "./loader.js";
import {update_helper} from "./helper.js";
import {log} from "./log.js";

export const
	canvas = document.querySelector("#canvas"),
	ctx = canvas.getContext("2d"),
	scale = 20;

// Prepare canvas
canvas.width = 20 * scale;
canvas.height = 20 * scale;
canvas.addEventListener("mousemove", update_helper);

load_map("maps/1.json", map => {
	// Place a cockroach
	const cockroach = new Cockroach(map, ctx, 0)
		.spawn(6, 15)
		.pathfind(16, 3);
});