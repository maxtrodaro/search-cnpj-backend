const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");

describe("Store", () => {
	test("should be able to register a new store", async () => {
		const store = await factory.attrs("Store");

		const response = await request(app).post("/store").send(store);

		expect(response.status).toBe(200);
	});

	afterAll(async (done) => {
		done();
	});
});
