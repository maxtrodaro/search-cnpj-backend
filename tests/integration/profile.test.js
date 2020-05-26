const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");

describe("Profile", () => {
	beforeEach(async () => {
		await truncate();
	});

	test("should be able to register a new profile", async () => {
		const profile = await factory.attrs("Profile");

		const response = await request(app).post("/profile").send(profile);

		expect(response.status).toBe(200);
	});

	test("should be able to list a profiles", async () => {
		const profile = await request(app).get("/profile");

		expect(profile.status).toBe(200);
	});

	test("validation of fields in the response in the profiles", async () => {
		const profile = await factory.attrs("Profile");
		await request(app).post("/profile").send(profile);

		const listProfile = await request(app).get("/profile");

		expect(listProfile.body).toEqual([
			{
				createdAt: expect.any(String),
				id: expect.any(Number),
				name: expect.any(String),
				permission: expect.any(String),
				password_hash: expect.any(String),
				updatedAt: expect.any(String),
				username: expect.any(String),
			},
		]);
	});

	test("should be able to delete a profile", async () => {
		const profile = await factory.attrs("Profile");
		await request(app).post("/profile").send(profile);

		const deleteProfile = await request(app).delete(
			`/profile/${profile.username}`
		);

		expect(deleteProfile.status).toBe(204);
	});

	test("should be able to edit a profile", async () => {
		const profile = await factory.attrs("Profile");
		await request(app).post("/profile").send(profile);

		const editProfile = await request(app)
			.put(`/profile/${profile.username}`)
			.send({
				name: "Updated Name",
				username: "testando123",
				permission: "master",
			});

		expect(editProfile.status).toBe(204);
	});

	afterAll(async (done) => {
		done();
	});
});
