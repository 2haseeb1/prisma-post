import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Request Body in validateRequest (before validation):', req.body);
    try {
      schema.parse(req.body); // Validate req.body directly
      console.log('Validation successful');
      next();
    } catch (error) {
      console.log('Validation error:', error);
      res.status(400).json({
        success: false,
        status: 400,
        message: 'Validation error',
        error: error instanceof Error ? error.message : error,
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
      });
    }
  };
};

export default validateRequest;