const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");

describe("Server", () => {
	test("should be able to register", async () => {
		const server = await factory.attrs("Server");

		const response = await request(app).post("/server").send(server);

		expect(response.status).toBe(200);
	});
});
