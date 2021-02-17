# test-scg-service-draft (Express.js)

The service of buy product from vending machine. This project has repositories as below.

- [test-scg-client](https://github.com/einost/test-scg-client) (Nuxt.js)
- [test-scg-service](https://github.com/einost/test-scg-service) (Hapi.js)
- [test-scg-service-draft](https://github.com/einost/test-scg-service-draft) (Express.js)
- [test-scg-sdk](https://github.com/einost/test-scg-sdk) (Dependency of scg service)

## `Installation`

### Software required

1. node
1. pm2

Download this project.

First step
```
$ npm install -g pm2
```

Next step
```
$ npm install
$ pm2 start server.json && pm2 logs
```

## `API`

- POST /api/admin/login
- POST /api/auth/refresh-token
- GET /api/vending-machine/get-list
- POST /api/vending-machine/get-stock-list
- POST /api/vending-machine/payment'