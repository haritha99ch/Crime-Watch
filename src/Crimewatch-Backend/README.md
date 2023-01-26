# Crime Watch Backend

The API server for the Crime Watch web application build using Express/TSNode.

## Development Server.

### Setting Environment Variables

```
> pwd
~/Crime-Watch/src/Crimewatch-Backend
```

1.  Create a file `.env`.

    `Crimewatch-Backend$ touch .env`

2.  Set the following.

```
    MONGO_URL = mongodb://localhost/IMS
    MONGO_URL_TEST = mongodb://localhost/IMSTEST
    MONGO_URL_PROD = mongodb://localhost/IMS
    SERVER_PORT = 8080
    SERVER_HOST = localhost
```
**In Windows use the the IP address instead of "localhost" in the connection string.**
`mongodb://127.0.0.1/IMS`

### Unit Testing.

Run `npm test` to run the unit testing for the services.

### Serve the API.

Run `npm start` to srat the API server. Navigate to `http://localhost:8080/`. If the frontend has already been built, it will be servered as well
