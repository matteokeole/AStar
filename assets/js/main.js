import Map from "./Map.js";
import Renderer from "./Renderer.js";
// import log from "./log.js";

const renderer = new Renderer(canvas, {
	scaleMultiplier: 20,
	backgroundColor: "#272727",
});

const map = await Map.load("maps/1.json");

renderer.render(map);