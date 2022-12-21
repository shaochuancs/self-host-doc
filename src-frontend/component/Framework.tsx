/**
 * Created by cshao on 2022/12/20.
 */

'use strict';

import {Outlet, Link} from 'react-router-dom';

const React = require('react');

export default function Framework() {
  return (
    <>
      <div className='menu'>
        <h1>Menu</h1>
        <nav>
          <ul>
            <li><Link to='item/1'>Item 1</Link></li>
            <li><Link to='item/2'>Item 2</Link></li>
          </ul>
        </nav>
      </div>
      <div className='content'><Outlet /></div>
    </>
  );
}