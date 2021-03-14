## Description

RESTful API that can `create/read/update/delete` user data from a persistence store

### User Model

```
{
  "id": "xxx",                  // user ID (must be unique)
  "name": "backend test",       // user name
  "dob": "",                    // yyyy-mm-dd
  "address": "",                // user address
  "description": "",            // user description
  "createdAt": ""               // user created date
  "updatedAt": ""               // user updated date
}
```

## Installation

```bash
make build;
make up;
```

## Running the app

```bash
# development
docker-compose run --rm main npm run start

# watch mode
docker-compose run --rm main npm run start:dev

# production mode
docker-compose run --rm main npm run start:prod
```

## Test

```bash
# unit tests
docker-compose run --rm main npm run test

# e2e tests
docker-compose run --rm main npm run test:e2e

# test coverage
docker-compose run --rm main npm run test:cov
```

## Endpoint

```bash
GET http://localhost:3000/api/users

GET http://localhost:3000/api/users/:id

POST http://localhost:3000/api/users

PUT http://localhost:3000/api/users/:id

DELETE http://localhost:3000/api/users/:id

GET http://localhost:3000/api/users/:id/address
```