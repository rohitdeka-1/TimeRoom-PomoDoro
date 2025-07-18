import Joi from "joi"; // Correct import with capital 'J'

const signupValidation = (req, res, next) => {
    const schema = Joi.object({ // Correct usage of Joi (capital 'J')
        name: Joi.string().min(3).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });

    const { error } = schema.validate(req.body); // Fixed typo
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message // Improved error detail
        });
    }

    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({ // Correct usage of Joi
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });

    const { error } = schema.validate(req.body); // Fixed typo
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message // Improved error detail
        });
    }

    next();
};

export { signupValidation, loginValidation };
