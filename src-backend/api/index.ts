/**
 * Created by cshao on 2021/12/12
 */

'use strict';

import {Request, Response, Router} from "express";

const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'example'
  });
});

router.post('/login', (req: Request, res: Response) => {
  res.cookie('token', jwt.sign({
    username: req.body.username
  }, req.app.get('SECRET')))
  res.status(200).end();
});

export default router;
