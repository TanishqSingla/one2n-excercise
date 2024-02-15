import { Router } from "express";
import { HealthCheckController } from "../../controllers/v1/healthcheck";

export const router = Router();

router.get("/healthcheck", HealthCheckController.get);
