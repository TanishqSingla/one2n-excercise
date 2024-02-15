class RequestMeta {
	id
	startTime;

	constructor() {
		this.id = crypto.randomUUID();
		this.startTime = Date.now();
	}

	get timeElapsed() {
		return Date.now() - this.startTime;
	}
}

export const logger = (req, res, next) => {
	req.meta = new RequestMeta();

	const Request = {
		ID:       req.meta.id,
		Request:  req.path,
		Time:     new Date().toISOString(),
		Body:     req.body,
		Query:    req.query,
	}
	console.log(Request);

	const original = res.json;
	res.json = function (_data) {
		const Response = {
			ID:            req.meta.id,
			Response:      req.path,
			Time:          new Date().toISOString(),
			TimeElapsed:   req.meta.timeElapsed,
			RequestBody:   req.body,
			Query:         req.query,
		}
		console.log(Response);

		original.apply(this, arguments);
	}

	next();
}
