const request = require("supertest");

const factory = require("./factories");
const app = require("../src/app");

const getToken = async () => {
	const profile = await factory.attrs("Profile");

	await request(app).post("/profile").send(profile);

	const response = await request(app).post("/authenticate").send(profile);

	return response;
};

module.exports = getToken;
