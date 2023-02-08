/**
 * Created by cshao on 2021/12/12
 */

'use strict';

import ServiceConfig from './config/ServiceConfig';
import {parsePort} from './util/network';

require('./logger/configure-logger');

function configure() {
  ServiceConfig.set('PORT', parsePort(process.env.PORT));
  ServiceConfig.set('SECRET', process.env.SECRET);
}

export default configure;
