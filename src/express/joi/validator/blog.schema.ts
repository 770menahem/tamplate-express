import * as Joi from 'joi';

// blog schema
export const createSchema = Joi.object({
    body: {
        title: Joi.string().required(),
        description: Joi.string().required(),
    },
});

// update schema
export const updateSchema = Joi.object({
    body: {
        description: Joi.string().required(),
    },
});
