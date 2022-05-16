const
	debug = document.querySelector("#debug"),
	logger = false,
	auto_scroll = false;

/**
 * Log a message into the debug console.
 * @param	{string}	message		Log content
 * @param	{string}	[type=""]	Log type
 */
export const log = (message, type = "") => {
	if (logger) {
		if (auto_scroll) {const debug_end = (debug.scrollTop + innerHeight + 200) > debug.scrollHeight}

		// Wrap the message into a <span>
		message = `<span class="log ${type}">${message}</span>`;

		// Highlight numbers for inline messages
		if (!type || type === "note") message = message.replace(/(\d+)/g, `<span class='number'>$1</span>`);

		debug.innerHTML += message;

		// update scroll Y position
		if (auto_scroll && debug_end) debug.scrollTop = debug.scrollHeight;
	}
};