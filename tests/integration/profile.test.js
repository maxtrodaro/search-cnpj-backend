const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");

describe("Profile", () => {
	it("should be able to register", async () => {
		const profile = await factory.attrs("Profile");

		const response = await request(app).post("/profile").send(profile);

		expect(response.status).toBe(200);
	});

	afterAll(async (done) => {
		done();
	});
});
