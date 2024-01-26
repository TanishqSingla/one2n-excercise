import { Router } from "express";

export const router = Router();

router.get("/healthcheck", (_req, res) => 
	res.status(200).json({
		status: "alive"
	})
)
