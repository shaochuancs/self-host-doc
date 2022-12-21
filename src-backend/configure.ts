/**
 * Created by cshao on 2021/12/12
 */

'use strict';

import ConfigService from "./service/ConfigService";
import {parsePort} from "./util/network";

require('./logger/configure-logger');

function configure() {
  ConfigService.setConfig('PORT', parsePort(process.env.PORT));
  ConfigService.setConfig('SECRET', process.env.SECRET);
}

export default configure;
