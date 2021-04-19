import express from 'express';
const router = express.Router();
import { verifyRefreshToken } from '../services/jwtServices.js';

import {
  registerUserService,
  loginUserService,
  deleteAllService,
} from '../services/authServices.js';

// Register
router.post('/register', async (req, res) => {
  const savedUser = await registerUserService(
    req.body.name,
    req.body.email,
    req.body.password
  );
  res.send(savedUser);
});

// Login logic
router.post('/login', async (req, res) => {
  const [accessToken, refreshToken] = await loginUserService(
    req.body.email,
    req.body.password
  );
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.post('/deleteAll', async (req, res) => {
  await deleteAllService();
});

// this route is used for verifying requestToken and gain user a new JWT accessToken
// TODO: need to implement proper code to check refreshToken and sign new accessToken to user
router.post('/token', async (req, res) => {
  const newAccessToken = verifyRefreshToken(req.body);
  res.json({ newAccessToken: newAccessToken });
});
export default router;
