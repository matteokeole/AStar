import {ctx, scale} from "./main.js";

/**
 * Load a JSON map file.
 * @param	{string}	path				File path
 * @param	{function}	[callback=Function]	Callback function
 */
export const load_map = (path, callback = Function) => {
	fetch(path)
		.then(response => response.json())
		.then(response => {
			const map = {
				obstacles: [],
			};

			ctx.fillStyle = "#272727";

			// Render obstacles
			for (let part of response.map) {
				map.obstacles.push({
					from: part.origin,
					to: part.origin.map((o, i) => o + part.size[i]),
				});

				ctx.fillRect(
					part.origin[0] * scale,
					part.origin[1] * scale,
					part.size[0] * scale,
					part.size[1] * scale,
				);
			}

			ctx.canvas.style.backgroundImage = `url(assets/images/${response.background})`;

			callback(map);
		})
		.catch(error => console.error(error));
};