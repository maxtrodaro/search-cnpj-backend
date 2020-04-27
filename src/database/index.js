const Sequelize = require("sequelize");

const dbConfig = require("../config/connection");
const Profile = require("../models/Profile");
const ServerStore = require("../models/Server");
const Store = require("../models/Store");

const connection = new Sequelize(dbConfig);

const models = [Profile, ServerStore, Store];

models.map((model) => {
	model.init(connection);
});

module.exports = connection;
