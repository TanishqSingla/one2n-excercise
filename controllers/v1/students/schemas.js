import Joi from "joi";

export const getByIdSchema = Joi.object().keys({
	id: Joi.number().required(),
});

export const putSchema = Joi.object().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	age: Joi.number().required(),
	year: Joi.number().default(1)
});

export const deleteSchema = Joi.object().keys({
	id: Joi.number().required()
});
