import { getByIdSchema } from "./schemas.js";
import { Student } from "../../../models/Student.js";

export class StudentController {
	/**
		* Controller for GET /students
		**/
	static async getAll(req, res, next) {
		try {
			const students = await Student.findAll();

			console.log(students);
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
			const { error, value } = getByIdSchema.validate(req.query);
			if(error)
				return res.bang.unprocessableEntity(error.message);

			const student = await Student.findByPk(value.id);
			if(!student)
				res.bang.notFound("No such record exists");

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
}
