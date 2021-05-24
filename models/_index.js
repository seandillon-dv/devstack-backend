'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const { readdirSync } = require('fs');
const { join } = require('path');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.params
);

const db = {};

const files = readdirSync(__dirname);

for (const file of files) {
  if (file !== '_index.js') {
    const model = require(join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

for (const model in db) { if (db[model].associate) db[model].associate(db); }

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
