[![CircleCI](https://dl.circleci.com/status-badge/img/gh/shaochuancs/self-host-doc/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/shaochuancs/self-host-doc/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/shaochuancs/self-host-doc/badge.svg?branch=master)](https://coveralls.io/github/shaochuancs/self-host-doc?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/7133816b91576173c1dd/maintainability)](https://codeclimate.com/github/shaochuancs/self-host-doc/maintainability)

# self-host-doc

## Build
`npm run build`

## Launch
`npm start`

## Launch in production
1. Install pm2 globally (if not yet): `npm install -g pm2`
2. Install pm2-intercom to support logger in cluster mode: `pm2 install pm2-intercom`
3. Start app: `pm2 start dist/server/bundle.js --name app -i max`

## Usage

Open document editor `/app/editor`