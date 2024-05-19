import { NextFunction, Request, RequestHandler, Response } from 'express';

// async code কে receive করে resolve করতেছে, আর resolve এর মধ্যে কোনো এরর হলে গ্লোবাল এরর এর মধ্যে পাঠায় দিচ্ছে।
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
