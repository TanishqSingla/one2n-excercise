import Joi from "joi";

export const getByIdSchema = Joi.object().keys({
	id: Joi.number().min(1).required(),
});

export const putSchema = Joi.object().keys({
	firstName: Joi.string().required().min(2),
	lastName: Joi.string().required().min(2),
	age: Joi.number().required(),
	year: Joi.number().default(1)
});

export const deleteSchema = Joi.object().keys({
	id: Joi.number().required().min(1)
});

export const patchParamsSchema = Joi.object().keys({
	id: Joi.number().required().min(1)
});
export const patchBodySchema = Joi.object().keys({
	firstName: Joi.string().min(2).optional(),
	lastName: Joi.string().min(2).optional(),
	age: Joi.number().optional(),
	year: Joi.number().optional().min(1)
});
