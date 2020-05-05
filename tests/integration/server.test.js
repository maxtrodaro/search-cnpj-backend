const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");

describe("Server", () => {
	beforeEach(async () => {
		await truncate();
	});

	test("should be able to register a new server", async () => {
		const server = await factory.attrs("Server");

		const response = await request(app).post("/server").send(server);

		expect(response.status).toBe(200);
	});

	test("should be able to list servers", async () => {
		const response = await request(app).get("/server");

		expect(response.status).toBe(200);
	});

	test("validation of fields in the response in the servers", async () => {
		const server = await factory.attrs("Server");
		await request(app).post("/server").send(server);

		const listServers = await request(app).get("/server");

		expect(listServers.body).toEqual({
			count: expect.any(Number),
			rows: [
				{
					createdAt: expect.any(String),
					id: expect.any(Number),
					ip: expect.any(String),
					name: expect.any(String),
					updatedAt: expect.any(String),
				},
			],
		});
	});

	test("should be able delete a server", async () => {
		const server = await factory.attrs("Server");
		const response = await request(app).post("/server").send(server);

		const deleteServer = await request(app).delete(`/server/${server.ip}`);

		expect(deleteServer.status).toBe(204);
	});

	afterAll(async (done) => {
		done();
	});
});
