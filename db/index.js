import { Sequelize } from "sequelize";
import { initStudentModel } from "../models/Student.js";

/**
	* Returns db connection object
	**/
export const createDBConn = () => { 
	const db = new Sequelize({
		host: process.env.DB_HOST,
		dialect: "postgres",
		password: process.env.DB_PASS,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		database: process.env.DB_NAME
	});

	initStudentModel(db);

	return db;
};
