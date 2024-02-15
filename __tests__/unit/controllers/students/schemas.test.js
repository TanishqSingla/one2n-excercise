import { afterEach, beforeEach, describe, it, expect } from "bun:test";
import { deleteSchema, getByIdSchema, patchBodySchema, patchParamsSchema, putSchema } from "../../../../controllers/v1/students/schemas";

describe("Payload Schema - GET /students/student/:id", () => {
	const validPayload = { id: 1 };
	let mockPayload = { ...validPayload };

	beforeEach(() => { mockPayload = { ...validPayload }; });

	it("id - must be required", () => {
		delete mockPayload.id;
		const result = getByIdSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" is required`);
	});

	it("id - must be a number", () => {
		mockPayload.id = "abc";
		const result = getByIdSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be a number`);
	});

	it("id - must be greater than or equal to 1", () => {
		mockPayload.id = 0;
		const result = getByIdSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be greater than or equal to 1`);
	});

	it("success - valid payload", () => {
		const result = getByIdSchema.validate(validPayload);

		expect(result.error).toBeFalsy();
		expect(result.value).toEqual({ id: 1 });
	});
});

describe("Payload Schema - PUT /students/student", () => {
	const validPayload = {
		firstName: "joe",
		lastName: "doe",
		age: 18,
		year: 2
	};
	let mockPayload = { ...validPayload };

	afterEach(() => { mockPayload = { ...validPayload }; });

	it("firstName - must be required", () => {
		delete mockPayload.firstName;

		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"firstName" is required`);
	});

	it("firstName - must have length greater than or equal to 2", () => {
		mockPayload.firstName = "h";
		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"firstName" length must be at least 2 characters long`);
	});

	it("lastName - must be required", () => {
		delete mockPayload.lastName;

		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"lastName" is required`);
	});

	it("lastName - must have length greater than or equal to 2", () => {
		mockPayload.lastName = "h";
		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"lastName" length must be at least 2 characters long`);
	});


	it("age - must be required", () => {
		delete mockPayload.age;

		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"age" is required`);
	});

	it("age - must be a number", () => {
		mockPayload.age = "h";
		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"age" must be a number`);
	});

	it("year - must be a number", () => {
		mockPayload.year = "h";
		const result = putSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"year" must be a number`);
	});

	it("year - default value is 1", () => {
		delete mockPayload.year;

		const result = putSchema.validate(mockPayload);

		expect(result.value).toBeTruthy();
		expect(result.value).toEqual({
			firstName: "joe",
			lastName: "doe",
			age: 18,
			year: 1
		});
	});

	it("success - valid payload", () => {
		const result = putSchema.validate(mockPayload);

		expect(result.value).toBeTruthy();
		expect(result.value).toEqual({
			firstName: "joe",
			lastName: "doe",
			age: 18,
			year: 2
		});
	});
});

describe("Payload Schema - DELETE /students/student/:id", () => {
	it("id - must be a number", () => {
		const result = deleteSchema.validate({ id: "abc" });

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be a number`);
	});

	it("id - must be greater than or equal to 1", () => {
		const result = deleteSchema.validate({ id: 0 });

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be greater than or equal to 1`);
	});

	it("success - valid payload", () => {
		const result = deleteSchema.validate({ id: 123 });

		expect(result.value).toEqual({ id: 123 });
	});
});

describe("Payload Schema - PATCH /students/student/:id (params)", () => {
	it("id - must be a number", () => {
		const result = patchParamsSchema.validate({ id: "abc" });

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be a number`);
	});

	it("id - must be greater than or equal to 1", () => {
		const result = patchParamsSchema.validate({ id: 0 });

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be greater than or equal to 1`);
	});

	it("success - valid payload", () => {
		const result = patchParamsSchema.validate({ id: 123 });

		expect(result.value).toEqual({ id: 123 });
	});
});

describe("Payload Schema - PATCH /students/student/:id (body)", () => {
	it("firstName - must be a string", () => {
		const result = patchBodySchema.validate({ firstName: 1 });

		expect(result.error.message).toBe(`"firstName" must be a string`);
	});

	it("firstName - must be of at least length 2", async () => {
		const result = patchBodySchema.validate({ firstName: "h" });
		
		expect(result.error.message).toBe(`"firstName" length must be at least 2 characters long`);
	});

	it("lastName - must be a string", () => {
		const result = patchBodySchema.validate({ lastName: 1 });

		expect(result.error.message).toBe(`"lastName" must be a string`);
	});

	it("lastName - must be of at least length 2", async () => {
		const result = patchBodySchema.validate({ lastName: "h" });
		
		expect(result.error.message).toBe(`"lastName" length must be at least 2 characters long`);
	});

	it("age - must be a number", () => {
		const result = patchBodySchema.validate({ age: "abc" });

		expect(result.error.message).toBe(`"age" must be a number`);
	});

	it("year - must be a number", () => {
		const result = patchBodySchema.validate({ year: "abc" });

		expect(result.error.message).toBe(`"year" must be a number`);
	});

	it("year - must be greater than or equal to 1", () => {
		const result = patchBodySchema.validate({ year: 0 });

		expect(result.error.message).toBe(`"year" must be greater than or equal to 1`);
	});
});
