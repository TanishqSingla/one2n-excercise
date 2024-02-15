import util from "util";

class Logger {
	#LogLevels = {
		INFO: "INFO",
		WARN: "WARN",
		ERROR: "ERROR"
	};

	#LogLevelsColors = {
		INFO: "\x1b[36m",
		WARN: "\x1b[33m",
		ERROR: "\x1b[31m"
	};

	#level;
	#log(...messages) {
		const output = messages.reduce((prev, curr) => {
			if(typeof curr === "object")
				return prev + " " + util.inspect(curr, true, null, true);

			return prev + " " + this.#LogLevelsColors[this.#level] + curr + "\x1b[0m";
		}, "");
		console.log(output);
		return;
	}

	INFO(...messages) {
		this.#level = this.#LogLevels.INFO;
		this.#log(...messages);
	}

	WARN(...messages) {
		this.#level = this.#LogLevels.WARN;
		this.#log(...messages);
	}

	ERROR(...messages) {
		this.#level = this.#LogLevels.ERROR;
		this.#log(...messages);
	}
}

const logger = new Logger();
export default logger;
