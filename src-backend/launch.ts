/**
 * Created by cshao on 2020-03-02.
 */

'use strict';

import { engine } from 'express-handlebars';

import Logger from './logger/Logger';
import ConfigService from "./service/ConfigService";
import api from "./api";
import {generateAccessRecord} from "./util/network";

const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const {expressjwt} = require('express-jwt');
const path = require('path');

/**
 * Launch server
 */
function launch(): void {
  const app = express();
  configureApp(app);
  configureRoute(app);

  const port = ConfigService.getConfig('PORT');
  app.listen(port, ()=>{
    Logger.info(`Application listening on port: ${port}`);
  }).on('close', Logger.shutdown);
}

function configureApp(app) {
  app.set('SECRET', ConfigService.getConfig('SECRET'));
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve(__dirname, '../view'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(compression());
  app.use(cookieParser());
  app.use((req, res, next)=>{
    res.set({
      'X-XSS-Protection': '1; mode=block',
      'Expect-CT': 'max-age=86400',
      'Content-Security-Policy': 'default-src \'self\' https:;' +
                                 'script-src \'self\' \'unsafe-eval\';' +
                                 'style-src \'self\' \'unsafe-inline\';'
    });

    next();
  });
  app.use((req, res, next)=>{
    req.on('end', ()=>{
      Logger.info(generateAccessRecord(req, res, new Date()), Logger.CATEGORY.HTTP);
    });
    next();
  });
}

function configureRoute(app) {
  app.use('/app', expressjwt({
    secret: app.get('SECRET'),
    algorithms: ['HS256'],
    getToken: (req)=>{
      return req.cookies.token || null;
    }}).unless({path: ['/app/login']}));
  app.get('/app*', (req, res) => {
    res.render('index', {layout: false});
  });
  app.use('/api', api);
  app.use('/static', express.static(path.resolve(__dirname, '../view/static'), {'maxAge': '7d'}));
  app.use(express.static(path.resolve(__dirname, '../view/public'), {'maxAge': '7d'}));
  app.use(function (err, req, res, next) { // eslint-disable-line @typescript-eslint/no-unused-vars
    Logger.error(err);
    if (err.status === 401) {
      res.redirect('/app/login');
    } else {
      res.status(500).send(err.message);
    }
  });
}

export default launch;
