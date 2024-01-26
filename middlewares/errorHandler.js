export function errorHandler(logger) {
	return (err, _req, res, _next) => {
		if(logger) {
			logger(err);
		} else {
			console.log(err);
		}
		return res.bang.internalServerError("Unexpected error occurred");
	}
}

