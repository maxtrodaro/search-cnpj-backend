const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");

describe("Store", () => {
	it("should be able to register", async () => {
		const store = await factory.attrs("Store");

		const response = await request(app).post("/store").send(store);

		expect(response.status).toBe(200);
	});

	afterAll(async (done) => {
		done();
	});
});
