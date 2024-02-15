import { Model, DataTypes } from "sequelize";

export class Student extends Model {}

export const initStudentModel = (db) => Student.init({
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
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: 2,
			isAlpha: true
		},
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
	modelName: "Student",
	tableName: "students",
	underscored: true
});
