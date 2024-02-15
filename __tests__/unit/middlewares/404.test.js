import { describe, it, expect, beforeAll } from "bun:test";
import express from "express";
import request from "supertest";
import expressBang from "express-bang";
import { notFoundHandler } from "../../../middlewares/404";
import { STATUS_CODES } from "http";

const app = express();

describe("Middleware - 404", () => {
	beforeAll(() => {
		app.use(expressBang());
		app.get("/", (_req, res) => res.send("hello world"));
		app.use(notFoundHandler);
	});

	it("404 - Page not found", async () => {
		const res = await request(app).get("/hello");

		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			error: STATUS_CODES[404],
			message: "Page not found",
			statusCode: 404
		});
	});
});
