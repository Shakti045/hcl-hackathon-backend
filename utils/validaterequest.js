import { ZodError } from 'zod';

export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            if (schema.body) req.body = schema.body.parse(req.body);
            if (schema.query) req.query = schema.query.parse(req.query);
            if (schema.params) req.params = schema.params.parse(req.params);

            next(); 
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.errors.map(err => ({
                        path: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            next(error); 
        }
    };
};
