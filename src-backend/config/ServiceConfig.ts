/**
 * Created by cshao on 2022/11/30.
 */

'use strict';

const path = require('path');
const propertiesReader = require('properties-reader');

const properties = propertiesReader(path.resolve(__dirname, '../../config/application.properties'));

const configuration = {};

const config = {
  get: (key: string) => {
    const valFromConfiguration = configuration[key];
    if (valFromConfiguration) {
      return valFromConfiguration;
    }
    const valFromProperties = properties.get(key);
    if (valFromProperties) {
      return valFromProperties;
    }
    return null;
  },
  set: (key, value) => {
    configuration[key] = value;
  }
};

export default config;