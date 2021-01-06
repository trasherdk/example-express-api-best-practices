# example-express-api-best-practices

> This is an example app created for the blog post
'[5 best practices for building a modern API with Express](https://simonplend.com/5-best-practices-for-building-a-modern-api-with-express/)'.

_Note: A real application should have plenty of tests so that you can have confidence
in what you're releasing. This application does not have tests as it's been been
put together to demonstrate the best practices described [in my blog post](https://simonplend.com/5-best-practices-for-building-a-modern-api-with-express/),
and is not intended to be released in a production environment._

## Requirements

- Node.js >= v12

## Usage

```bash
# Install application dependencies
npm install

# Run API server
npm start
```

## Making API requests

- You can make `POST` requests to http://localhost:3000/user
- You can make `GET`, `PUT` and `DELETE` requests to http://localhost:3000/user/1234

Try a `POST` request to create a new user:

```bash
curl -v -X POST \
  -H 'Content-Type: application/json' \
  -d '{ "first_name": "Rosa", "last_name": "Parks" }' \
  http://localhost:3000/user
```

_Note: No data sent to the API is stored by this example application._

## Best practices

The five best practices which are described
[in my blog post](https://simonplend.com/5-best-practices-for-building-a-modern-api-with-express/)
and applied in this example application are:

1. Enable the full use of `async` and `await`
2. Validate request data with JSON Schema
3. Use an existing format for error responses
4. Send CORS response headers so web pages can call your API
5. Separate your concerns

## Libraries and frameworks used

- [Express](https://expressjs.com/) - "Fast, unopinionated, minimalist web
  framework for Node.js".
- [express-async-errors](https://github.com/davidbanham/express-async-errors) -
  "A dead simple ES6 async/await support hack for ExpressJS"
- [express-json-validator-middleware](https://github.com/vacekj/express-json-validator-middleware) -
  "express.js middleware for validating requests against JSON Schema"
- [body-parser](https://github.com/expressjs/body-parser) - "Node.js body parsing middleware"
- [cors](https://github.com/expressjs/cors) - "CORS is a node.js package for
  providing a Connect/Express middleware that can be used to enable CORS with various options."
- [http-errors](https://www.npmjs.com/package/http-errors) - "Create HTTP errors for Express, Koa, Connect, etc. with ease."
