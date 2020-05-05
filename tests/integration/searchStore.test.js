const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");

describe("SearchStore", () => {
	beforeEach(async () => {
		await truncate();
	});

	test("should be able to search a store", async () => {
		const store = await factory.attrs("Store");
		await request(app).post("/store").send(store);

		const listStore = await request(app)
			.get("/searchStore")
			.set("CNPJ", store.cnpj);

		expect(listStore.status).toBe(200);
	});

	afterAll(async (done) => {
		done();
	});
});
