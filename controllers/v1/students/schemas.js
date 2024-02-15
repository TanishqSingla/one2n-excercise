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

export const patchQuerySchema = Joi.object().keys({
	id: Joi.number().required()
});
export const patchBodySchema = Joi.object().keys({
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	age: Joi.number().optional(),
	year: Joi.number().optional()
});
