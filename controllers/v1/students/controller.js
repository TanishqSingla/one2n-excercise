import * as Schemas from "./schemas.js";
import { Student } from "../../../models/Student.js";

export class StudentController {
	/**
		* Controller for GET /students
		**/
	static async getAll(req, res, next) {
		try {
			const students = await Student.findAll();

			return res.status(200).json({
				data: students
			});
		} catch (err) {
			next(err);
		} 
	}

	/**
		* Controller for GET /students/student/:id
		**/
	static async getById(req, res, next) {
		try {
			const { error, value } = Schemas.getByIdSchema.validate(req.params);
			if(error)
				return res.bang.unprocessableEntity(error.message);

			const student = await Student.findByPk(value.id);
			if(!student)
				return res.bang.notFound("No such record exists");

			return res.status(200).json({
				message: "Record found",
				data: {
					student
				}
			});
		} catch (err) {
			next(err);
		}
	}

	/**
		* Controller for PUT /students/student
		**/
	static async put(req, res, next) {
		try {
			const { error, value } = Schemas.putSchema.validate(req.body);
			if(error)
				return res.bang.unprocessableEntity(error.message);

			const newStudent = Student.build({
				firstName: value.firstName,
				lastName: value.lastName,
				age: value.age,
				year: value.year
			});

			if(!newStudent.isNewRecord)
				return res.bang.conflict("Duplicate data");

			const result = await newStudent.save();
			if(!result)
				return res.bang.internalServerError("Failed to create user");

			return res.status(201).json({
				message: "Successfully created student",
				data: result.dataValues
			});
		} catch (err) {
			next(err);
		}
	}

	/**
		* Controller for PATCH /students/student/:id
		**/
	static async patch(req, res, next) {
		try {
			const { queryError } = Schemas.patchQuerySchema.validate(req.params);
			if(queryError)
				return res.bang.unprocessableEntity(queryError.message);

			const { error, value } = Schemas.patchBodySchema.validate(req.body); 
			if(error)
				return res.bang.unprocessableEntity(error);

			const newStudent = await Student.update(value, { where: { id: req.params.id } });
			if(!newStudent)
				return res.bang.internalServerError("Unable to update user");

			return res.status(200).json({ message: "User updated succesfully" });
		} catch (err) {
			next(err);
		} 
	}

	/**
		* Controller for DELETE /students/student/:id
		**/
	static async delete(req, res, next) {
		try {
			const { error, value } = Schemas.deleteSchema.validate(req.params);
			if(error)
				return res.bang.unprocessableEntity(error.message);

			const result = await Student.destroy({ where: { id: value.id } });
			if(!result)
				return res.bang.internalServerError("Failed to delete user");

			return res.status(200).json({
				message: "Successfully deleted the user"
			});
		} catch (err) {
			next(err);
		}
	}
}
