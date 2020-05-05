const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");
const getToken = require("../getToken");

describe("Login", () => {
	beforeEach(async () => {
		await truncate();
	});

	test("should be able to login", async () => {
		const profile = await factory.attrs("Profile");
		await request(app).post("/profile").send(profile);

		const profileToken = await getToken();

		const login = await request(app)
			.get("/token")
			.set("Authorization", `Bearer ${profileToken.body.token}`);

		expect(login.status).toBe(200);
	});

	afterAll(async (done) => {
		done();
	});
});
