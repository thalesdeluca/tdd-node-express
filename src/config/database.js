'use strict';
require("dotenv").config()
const knex = require('knex');

const configs = {
  mysql: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debugging: true
  }
}

module.exports = knex(configs[process.env.DB_CLIENT || 'mysql'])
