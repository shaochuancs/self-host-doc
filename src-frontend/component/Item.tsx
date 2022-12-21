/**
 * Created by cshao on 2022/12/20.
 */

'use strict';

import {useParams} from 'react-router-dom';

const React = require('react');

export default function Item() {
  const {itemId} = useParams();
  return (
    <div><h1>Welcome, item {itemId}!</h1></div>
  );
}