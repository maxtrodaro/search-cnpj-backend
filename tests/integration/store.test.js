const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");

describe("Store", () => {
	beforeEach(async () => {
		await truncate();
	});

	test("should be able to register a new store", async () => {
		const store = await factory.attrs("Store");

		const response = await request(app).post("/store").send(store);

		expect(response.status).toBe(200);
	});

	test("should be able to list a new store", async () => {
		const response = await request(app).get("/store");

		expect(response.status).toBe(200);
	});

	test("validation of fields in the response in the stores", async () => {
		const store = await factory.attrs("Store");
		await request(app).post("/store").send(store);

		const listStore = await request(app).get("/store");

		expect(listStore.body).toEqual({
			count: expect.any(Number),
			rows: [
				{
					cnpj: expect.any(String),
					cod_emp: expect.any(String),
					createdAt: expect.any(String),
					id: expect.any(Number),
					name: expect.any(String),
					serv_ip: expect.any(String),
					updatedAt: expect.any(String),
				},
			],
		});
	});

	test("should be able to delete a store", async () => {
		const store = await factory.attrs("Store");
		await request(app).post("/store").send(store);

		const deleteStore = await request(app).delete(`/store/${store.cnpj}`);

		expect(deleteStore.status).toBe(204);
	});

	test("should be able to edit a store", async () => {
		const store = await factory.attrs("Store");
		await request(app).post("/store").send(store);

		const editStore = await request(app).put(`/store/${store.cnpj}`).send({
			name: "Updated Store",
			cnpj: "64448500000173",
			cod_emp: "TEST0001",
			serv_ip: "10.1.1.1",
		});

		expect(editStore.status).toBe(204);
	});

	afterAll(async (done) => {
		done();
	});
});
