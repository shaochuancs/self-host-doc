/**
 * Created by cshao on 2022/12/18.
 */

'use strict';

const path = require('path');
const log4js = require('log4js');

log4js.configure(path.resolve(__dirname, '../../config/log4js.json'));