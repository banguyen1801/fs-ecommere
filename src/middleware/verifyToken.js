import jwt from 'jsonwebtoken';
import { badRequest } from '../errors/ApiError.js';

export function verify(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return badRequest(res, 'Access Denied');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return badRequest(res, 'Has An Invalid Token');
    req.user = user;
    next();
  });
}
