import request from "supertest";
import { app } from "../../../app";
import { describe, it, expect } from "bun:test";

describe("/GET healthcheck", () => {
	it("200 - success", async () => {
		const res = await request(app).get("/v1/healthcheck");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({ status: "alive" });
	});
});
