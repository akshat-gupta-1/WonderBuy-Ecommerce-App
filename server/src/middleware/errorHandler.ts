import { statusCodes } from '../Utils/constants';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  switch (statusCode) {
    case statusCodes.NOT_FOUND:
      res.status(statusCode);
      res.json({
        status: 'Not Found',
        message: err.message,
      });
      break;
    case statusCodes.VALIDATION_ERROR:
      res.status(statusCode);
      res.json({
        status: 'Validation Error',
        message: err.message,
      });
      break;
    case statusCodes.FORBIDDEN:
      res.status(statusCode);
      res.json({
        status: 'Forbidden',
        message: err.message,
      });
      break;
    case statusCodes.UNAUTHORIZED:
      res.status(statusCode);
      res.json({
        status: 'Unauthorized',
        message: err.message,
      });
      break;
    case statusCodes.SERVER_ERROR:
      res.status(statusCode);
      res.json({
        status: 'Server Error',
        message: err.message,
      });
      break;
    default:
      console.log('No Errors. All good!!');
  }
};
