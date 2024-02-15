import Joi from "joi";

export const getByIdSchema = Joi.object().keys({
	id: Joi.string().required(),
});
