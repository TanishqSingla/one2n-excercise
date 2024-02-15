import { beforeEach, describe, it, expect } from "bun:test";
import { getByIdSchema } from "../../../../controllers/v1/students/schemas";

describe("Payload Schema - /students/student/:id", () => {
	const validPayload = { id: 1 };
	let mockPayload = { ...validPayload };

	beforeEach(() => { mockPayload = { ...validPayload }; });

	it("should be required", () => {
		delete mockPayload.id;
		const result = getByIdSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" is required`);
	});

	it("should be a number", () => {
		mockPayload.id = "abc";
		const result = getByIdSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be a number`);
	});

	it("should be greater than or equal to 1", () => {
		mockPayload.id = 0;
		const result = getByIdSchema.validate(mockPayload);

		expect(result.error).toBeTruthy();
		expect(result.error.message).toBe(`"id" must be greater than or equal to 1`);
	});

	it("should return value for valid payload", () => {
		const result = getByIdSchema.validate(validPayload);

		expect(result.error).toBeFalsy();
		expect(result.value).toEqual({ id: 1 });
	});
});
