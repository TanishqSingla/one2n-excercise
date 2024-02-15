import express from "express";
import { StudentController } from "../../controllers/v1/students/controller.js";

export const studentRouter = express();

studentRouter.get("/", StudentController.getAll);
studentRouter.get("/student/:id", StudentController.getById);
studentRouter.patch("/student/:id", StudentController.patch);
studentRouter.put("/student", StudentController.put);
studentRouter.delete("/student/:id", StudentController.delete);
