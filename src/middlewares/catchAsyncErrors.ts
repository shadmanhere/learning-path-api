import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

module.exports =
  (
    func: (
      arg0: Request<ParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>,
      arg1: Response<unknown, Record<string, unknown>>,
      arg2: NextFunction,
    ) => unknown,
  ) =>
  // eslint-disable-next-line prettier/prettier
    (req: Request, res: Response, next: NextFunction) =>
    // eslint-disable-next-line prettier/prettier
      Promise.resolve(func(req, res, next)).catch(next);
