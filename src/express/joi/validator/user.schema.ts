import * as Joi from 'joi';

// blog schema
export const createSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        password: Joi.string().required(),
    },
});

// update schema
export const updateSchema = Joi.object({
    body: {
        name: Joi.string().required(),
    },
});
