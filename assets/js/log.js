const
	debug = document.querySelector("#debug"),
	log_enabled = true;

/**
 * Log a message into the debug console.
 * @param	{string}	message		Log content
 * @param	{string}	[type=""]	Log type
 */
export const log = (message, type = "") => {
	if (log_enabled) {
		const debug_end = (debug.scrollTop + innerHeight + 200) > debug.scrollHeight;

		// Wrap the message into a <span>
		message = `<span class="log ${type}">${message}</span>`;

		// Highlight numbers for inline messages
		(!type || type === "note") && (message = message.replace(/(\d+)/g, `<span class='number'>$1</span>`));

		// Send the message and update the scroll Y position
		debug.innerHTML += message;
		debug_end && (debug.scrollTop = debug.scrollHeight);
	}
};