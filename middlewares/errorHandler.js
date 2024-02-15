import logger from "../utils/Logger.js";

export function errorHandler(err, _req, res, _next) {
	logger.ERROR(err);
	return res.bang.internalServerError("Unexpected error occurred");
}

