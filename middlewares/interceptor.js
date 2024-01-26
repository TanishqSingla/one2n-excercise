class Timer {
	startTime;

	start() {
		this.startTime = Date.now();
	}

	get end() {
		return Date.now() - this.startTime;
	}
}

export const requestInterceptor = (req, _res, next) => {
	console.log("Request:", req.path);
	console.log("  Time", new Date().toTimeString());
	console.log("  Body", req.body);
	console.log("  Query", req.query);
	next();
}
