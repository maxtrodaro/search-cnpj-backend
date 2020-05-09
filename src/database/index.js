const Sequelize = require("sequelize");

const dbConfig = require("../config/connection");
const Profile = require("../models/Profile");
const ServerStore = require("../models/Server");
const Store = require("../models/Store");

const connection = new Sequelize(dbConfig);

Profile.init(connection);
ServerStore.init(connection);
Store.init(connection);

Store.associate(connection.models);

module.exports = connection;
