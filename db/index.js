import { Sequelize } from "sequelize";

/**
	* Returns db connection object
	**/
export const createDBConn = () => new Sequelize({
	host: process.env.DB_HOST,
	dialect: "postgres",
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	database: process.env.DB_NAME
});
