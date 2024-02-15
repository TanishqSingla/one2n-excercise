import { Router } from "express";
import { HealthCheckController } from "../../controllers/v1/healthcheck.js";
import { studentRouter } from "./studentRouter.js";

export const router = Router();

router.get("/healthcheck", HealthCheckController.get);
router.use("/students", studentRouter);
