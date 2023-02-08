/**
 * Created by cshao on 2022/12/29.
 */

'use strict';

import ServiceConfig from '../../src-backend/config/ServiceConfig';

describe('Test ServiceConfig', ()=>{
  test('Should be able to read properties from application.properties file', ()=>{
    expect(ServiceConfig.get('PORT')).toBe(3000);
    expect(ServiceConfig.get('SECRET')).toBe('example_secret');
  });

  test('Should be able to set property and read later', ()=>{
    ServiceConfig.set('EXAMPLE_KEY', 42);
    expect(ServiceConfig.get('EXAMPLE_KEY')).toBe(42);
  });

  test('Should get null for non-exists property', ()=>{
    expect(ServiceConfig.get('INVALID_KEY')).toBe(null);
  });
});