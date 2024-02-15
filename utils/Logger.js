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
	logFn;

	/**
		* @param {*} [logFn=console.log] - Log function to run 
		**/
	constructor(logFn) {
		this.logFn = logFn || console.log;
	}


	/**
		* Logs the output
		* @param {...*} messages - variadic args of messages to log
		**/
	#log(...messages) {
		const output = messages.reduce((prev, curr) => {
			if(typeof curr === "object")
				return prev + util.inspect(curr, true, null, true) + " ";

			return prev + this.#LogLevelsColors[this.#level] + curr + "\x1b[0m" + " ";
		}, "");
		this.logFn(output);
		return;
	}

	/**
		* Logs the message in info color
		* @param {...*} messages - variadic args of messages to log
		**/
	INFO(...messages) {
		this.#level = this.#LogLevels.INFO;
		this.#log(...messages);
	}

	/**
		* Logs the message in warn color
		* @param {...*} messages - variadic args of messages to log
		**/
	WARN(...messages) {
		this.#level = this.#LogLevels.WARN;
		this.#log(...messages);
	}

	/**
		* Logs the message in error color
		* @param {...*} messages - variadic args of messages to log
		**/
	ERROR(...messages) {
		this.#level = this.#LogLevels.ERROR;
		this.#log(...messages);
	}
}

const logger = new Logger();
export default logger;
