import { Response } from 'express';

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: any,
) => {
  console.log(res.cookie, 'response');
  res.cookie(name, value, options);
};
