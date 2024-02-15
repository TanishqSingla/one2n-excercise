import { Router } from "express";
import { HealthCheckController } from "../../controllers/v1/healthcheck.js";

export const router = Router();

router.get("/healthcheck", HealthCheckController.get);
