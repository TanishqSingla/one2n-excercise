import logger from "../utils/Logger.js";

class RequestMeta {
	id;
	startTime;

	constructor() {
		this.id = crypto.randomUUID();
		this.startTime = Date.now();
	}

	get timeElapsed() {
		return Date.now() - this.startTime;
	}
}

export const loggerMiddleware = (req, res, next) => {
	req.meta = new RequestMeta();

	const Request = {
		ID:       req.meta.id,
		Request:  req.path,
		Time:     new Date().toISOString(),
		Body:     req.body,
		Query:    req.query,
	};
	logger.INFO("Request", Request);

	const original = res.json;
	res.json = function (_data) {
		const Response = {
			ID:            req.meta.id,
			Response:      req.path,
			Time:          new Date().toISOString(),
			TimeElapsed:   req.meta.timeElapsed,
			RequestBody:   req.body,
			Query:         req.query,
		};
		logger.INFO("Response", Response);

		original.apply(this, arguments);
	};

	next();
};
