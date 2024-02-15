import { Model, DataTypes } from "sequelize";
import { db } from "../server";

export class Student extends Model {}

Student.init({
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUID,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: 2,
			isAlpha: true
		},
		field: 'first_name'
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: 2,
			isAlpha: true
		},
		field: 'last_name'
	},
	age: {
		type: DataTypes.SMALLINT,
		allowNull: false,
		validate: {
		}
	},
	year: {
		type: DataTypes.SMALLINT,
		validate: {
			min: 1,
		}
	},
}, {
	sequelize: db,
	modelName: 'Student',
	tableName: 'students'
});
