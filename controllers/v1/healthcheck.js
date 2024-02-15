export class HealthCheckController {
	static get(_req, res) {
		return res.status(200).json({
			status: "alive"
		});
	}
}
