import { afterEach, describe, it, expect } from "bun:test";
import sinon from "sinon";
import { Student } from "../../../../models/Student";
import request from "supertest";
import { app } from "../../../../app";
import { STATUS_CODES } from "http";

describe("GET /students", () => {
	let findAllStub = sinon.stub(Student, "findAll"); 

	afterEach(() => {
		sinon.reset();
	});

	it("200 - Success", async () => {
		findAllStub.returns([{ value: 1 }, { value: 2 }]);

		const res = await request(app).get("/v1/students");
		
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ data: [{ value: 1 }, { value: 2 }] });
	});

	it("500 - Unexpected error", async () => {
		findAllStub.throws(new Error("Expected Error"));

		const res = await request(app).get("/v1/students");

		expect(res.status).toBe(500);
		expect(res.body).toEqual({
			error: STATUS_CODES[500],
			message: "Expected Error",
			statusCode: 500
		});
	});
});
