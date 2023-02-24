import Map from "src/map";
import Renderer from "src/renderer";

const renderer = new Renderer(canvas, {
	scaleMultiplier: 20,
	backgroundColor: "#272727",
});

const map = await Map.load("assets/maps/map1.json");

renderer.render(map);