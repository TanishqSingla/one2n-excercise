import { afterEach, describe, it, expect } from "bun:test";
import sinon from "sinon";
import { Student } from "../../../../models/Student";
import request from "supertest";
import { app } from "../../../../app";
import { STATUS_CODES } from "http";

describe("GET /students", () => {
	const findAllStub = sinon.stub(Student, "findAll"); 

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

describe("GET /students/student/:id", () => {
	const findByPkStub = sinon.stub(Student, "findByPk");

	afterEach(() => {
		sinon.reset();
	});

	it("422 - Invalid Payload: id must be a number", async () => {
		const res = await request(app).get("/v1/students/student/abc");

		expect(res.status).toBe(422);
		expect(res.body).toEqual({
			error: STATUS_CODES[422],
			message: `"id" must be a number`,
			statusCode: 422,
		});
	});

	it("422 - Invalid Payload: id must be greater than or equal to", async () => {
		const res = await request(app).get("/v1/students/student/0");

		expect(res.status).toBe(422);
		expect(res.body).toEqual({
			error: STATUS_CODES[422],
			message: `"id" must be greater than or equal to 1`,
			statusCode: 422,
		});
	});

	it("500 - Expected Error", async () => {
		findByPkStub.throws(new Error("Expected Error"));

		const res = await request(app).get("/v1/students/student/12");

		expect(res.status).toBe(500);
		expect(res.body).toEqual({
			error: STATUS_CODES[500],
			message: "Expected Error",
			statusCode: 500,
		});
	});

	it("404 - Student not found", async () => {
		findByPkStub.returns(null);

		const res = await request(app).get("/v1/students/student/12");

		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			error: STATUS_CODES[404],
			message: "No such record exists",
			statusCode: 404,
		});
	});

	it("200 - Student found", async () => {
		findByPkStub.returns({ value: 1 });

		const res = await request(app).get("/v1/students/student/12");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			message: "Record found",
			data: { student: { value: 1 } }
		});
	});
});
