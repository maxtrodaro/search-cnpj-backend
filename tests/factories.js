const faker = require("faker");
const FactoryGirl = require("factory-girl");
const factory = FactoryGirl.factory;

const Profile = require("../src/models/Profile");
const Store = require("../src/models/Store");
const ServerStore = require("../src/models/Server");
const FakerCnpj = require("./util/generateFakerCnpj");

factory.define("Profile", Profile, () => ({
	name: faker.name.findName(),
	username: faker.internet.userName(),
	password: faker.internet.password(),
	permission: faker.lorem.word,
}));

factory.define("Store", Store, () => ({
	name: faker.name.findName(),
	cnpj: FakerCnpj().toString(),
	cod_emp: faker.random.alphaNumeric(8),
	serv_ip: faker.internet.ip,
}));

factory.define("Server", ServerStore, () => ({
	name: faker.name.findName(),
	ip: faker.internet.ip,
}));

module.exports = factory;
