/**
 * Created by cshao on 2022/12/20.
 */

'use strict';

import {useRouteError} from 'react-router-dom';

const React = require('react');

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p><i>{error['statusText'] || error['message']}</i></p>
    </div>
  );
}