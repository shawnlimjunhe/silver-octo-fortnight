# Persistent Currency Convertor

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Introduction

This application regularly retrieves data from Coinbase's free API, providing you with up-to-date exchange rates. The application also stores historical exchange data, allowing you to check how the conversion pairs have changed over time!

## Installation

#### Prerequisites

Before you begin, make sure you have the following installed

- Node.js: downloadable from https://nodejs.org
- MongoDB: downloadable from https://www.mongodb.com/try/download/community

#### Clone the Repository

Clone the parent project repository

```bash
git clone https://github.com/shawnlimjunhe/silver-octo-fortnight.git
```

#### Install Dependencies

Navigate to the project directory in your shell

Once there, navigate to the backend folder

```bash
cd backend
```

Using npm:

```bash
npm install
```

You will also need to start your mongoDB server

In another shell

```bash
mongod
```

Depending on the port that your mongoDB server is running on, you might have to replace
the port number in the `MONGO_URI` variable in the `.env` file with the correct port. The default
port for mongoDB is `27017`.

#### Start the application

```bash
npm start
```

The application should now be running locally at `https://localhost:8000`. You can access it using your web browser or any development tools like Postman.

## API Endpoints

| Endpoint         | Method | Description                                |
| ---------------- | ------ | ------------------------------------------ |
| exchange-rates   | GET    | Gets latest exchange rate data in store    |
| historical-rates | GET    | Gets historical rates from a specific time |

#### 1. GET exchange-rates

##### Request Parameters

The endpoint expects the following query parameter:

- `base` (required): The base currency for which you want to retrieve exchange rates. It can be either "fiat" or "crypto". The supported target currencies depend on the chosen base currency.

#### 2. GET historical-rates

##### Request Parameters

The endpoint expects the following query parameters:

- `base_currency` (required): The base currency for historical exchange rate retrieval. It should be one of the supported currencies.

- `target_currency` (required): The target currency against which the historical exchange rates will be provided. It should also be one of the supported currencies. Cannot be the same as `base_currency`

- `start` (required): The start timestamp of the historical data range. The timestamp should be in Unix epoch time format.

- `end` (optional): The end timestamp of the historical data range. If not provided, the current date and time will be used as the default end timestamp. If provided, the timestamp should be in Unix epoch time format.

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Node.js web application framework
- axios: HTTP Client for Node.js
- MongoDB: NoSQL database
- Mongoose: Object Data Modeling library for MongoDB and Node.js
- Joi: Data validator for JavaScript

## License

This project is licensed under the [MIT](/LICENSE) License.
