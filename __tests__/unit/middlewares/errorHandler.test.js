import { describe, it, expect, beforeAll } from "bun:test";
import express from "express";
import request from "supertest";
import { errorHandler } from "../../../middlewares/errorHandler";
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
		app.get("/error", mockController, errorHandler);
	});

	it("500 - error is thrown successfully", async () => {
		const res = await request(app).get("/error");

		expect(res.status).toBe(500);
	});
});
