import { afterEach, beforeEach, describe, it, expect } from "bun:test";
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

describe("PUT /students/student", () => {
	const validPayload = {
		firstName: "joe",
		lastName: "doe",
		age: 18,
		year: 2
	};
	let mockPayload = { ...validPayload };

	const buildStub = sinon.stub(Student, "build");
	const saveStub = sinon.stub(Student, "save");

	beforeEach(() => {
		mockPayload = { ...validPayload };
	});

	afterEach(() => {
		sinon.reset();
	});

	it("422 - firstName is required", async () => {
		delete mockPayload.firstName;

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"firstName" is required`,
			statusCode: 422,
		});
	});

	it("422 - firstName must be of length greater than or equal to 2", async () => {
		mockPayload.firstName = "h";

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"firstName" length must be at least 2 characters long`,
			statusCode: 422,
		});
	});

	it("422 - lastName is required", async () => {
		delete mockPayload.lastName;

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"lastName" is required`,
			statusCode: 422,
		});
	});

	it("422 - lastName must be of length greater than or equal to 2", async () => {
		mockPayload.lastName = "h";

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"lastName" length must be at least 2 characters long`,
			statusCode: 422,
		});
	});

	it("422 - age is required", async () => {
		delete mockPayload.age;

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"age" is required`,
			statusCode: 422,
		});
	});

	it("422 - age must be a number", async () => {
		mockPayload.age = "abc";

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"age" must be a number`,
			statusCode: 422,
		});
	});

	it("422 - year must be a number", async () => {
		mockPayload.year = "abc";

		const result = await request(app).put("/v1/students/student").send(mockPayload);

		expect(result.status).toBe(422);
		expect(result.body).toEqual({
			error: STATUS_CODES[422],
			message: `"year" must be a number`,
			statusCode: 422,
		});
	});

	it("409 - Duplicate record", async () => {
		buildStub.returns({ isNewRecord: false });

		const res = await request(app).put("/v1/students/student").send(validPayload);

		expect(res.status).toBe(409);
		expect(res.body).toEqual({
			error: STATUS_CODES[409],
			message: "Duplicate data",
			statusCode: 409
		});
	});

	it("500 - Duplicate record", async () => {
		buildStub.returns({ isNewRecord: true });
		saveStub.returns(null);

		const res = await request(app).put("/v1/students/student").send(validPayload);

		expect(res.status).toBe(500);
		expect(res.body).toEqual({
			error: STATUS_CODES[500],
			message: "Failed to create student record",
			statusCode: 500
		});
	});

	it("201 - Success", async () => {
		buildStub.returns({ isNewRecord: true });
		saveStub.returns({ ...validPayload });

		const res = await request(app).put("/v1/students/student").send(validPayload);

		expect(res.status).toBe(201);
		expect(res.body).toEqual({
			message: "Successfully created student record",
			data: { ...validPayload }
		});
	});
});

