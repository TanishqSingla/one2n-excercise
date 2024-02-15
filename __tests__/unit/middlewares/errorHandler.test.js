import { describe, it, expect, beforeAll } from "bun:test";
import express from "express";
import request from "supertest";
import { errorHandler } from "../../../middlewares/errorHandler";
import { STATUS_CODES } from "http";
import expressBang from "express-bang";
const app = express();

const mockController = (req, res, next) => {
	try {
		throw new Error("Expected Error");
	} catch (err) {
		next(err);
	} 
}; 

describe("Middleware - errorHandler", () => {
	beforeAll(() => {
		app.use(expressBang());
		app.get("/error", mockController);
		app.use(errorHandler);
	});

	it("500 - error is thrown successfully", async () => {
		const res = await request(app).get("/error");

		expect(res.status).toBe(500);
		expect(res.body).toEqual({
			error: STATUS_CODES[500],
			message: "Expected Error",
			statusCode: 500
		});
	});
});
