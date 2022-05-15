import {scale} from "./main.js";

export const update_helper = e => {
	const
		rect = e.target.getBoundingClientRect(),
		x = Math.floor((e.clientX - rect.left) / scale),
		y = Math.floor((e.clientY - rect.top) / scale);

	helper.children[0].textContent = x;
	helper.children[1].textContent = y;

	helper.style.cssText = `
		display: flex;
		left: ${Math.floor(e.clientX / scale) * scale + 1}px;
		top: ${Math.floor(e.clientY / scale) * scale + 4}px;
	`;
};

const helper = document.querySelector(".helper");