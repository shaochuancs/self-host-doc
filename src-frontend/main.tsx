/**
 * Created by cshao on 2022/12/16.
 */

'use strict';

import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';

import router from './router';

const React = require('react');

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);