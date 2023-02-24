import Map from "src/map";
import Renderer from "src/renderer";
import Vector2 from "src/vector2";
import pathfind from "./astar.js";

const renderer = new Renderer(canvas, {
	scaleMultiplier: 20,
	backgroundColor: "#272727",
});

const map = await Map.load("assets/maps/map0.json");

renderer.setMap(map);
renderer.render(map.nodes);

// Pathfinding tests
{
	const path = pathfind(
		map.nodes,
		map.nodes.find(node => node.position.x == node.position.y == 0),
		new Vector2(19, 19),
	);

	renderer.render(path.map(node => {
		node.isPath = true;

		return node;
	}));
}