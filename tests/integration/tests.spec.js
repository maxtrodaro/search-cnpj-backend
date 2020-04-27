const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Tests", () => {
	beforeEach(async () => {
		await connection.migrate.latest();
	});

	afterEach(async () => {
		await connection.migrate.rollback();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	/**
	 * Profile Tests
	 */

	test("Should be able to create a new Profile", async () => {
		const response = await request(app).post("/profile").send({
			name: "Eduardo",
			username: "egodoy",
			password: "12345678",
		});

		expect(response.status).toBe(200);
	});

	test("When you try create a new Profile without name on body request", async () => {
		const response = await request(app).post("/profile").send({
			username: "egodoy",
			password: "12345678",
		});

		expect(response.body.message).toBe('"name" is required');
	});

	test("When you try create a new Profile without username on body request", async () => {
		const response = await request(app).post("/profile").send({
			name: "Eduardo",
			password: "12345678",
		});

		expect(response.body.message).toBe('"username" is required');
	});

	test("When you try create a new Profile without password on body request", async () => {
		const response = await request(app).post("/profile").send({
			name: "Eduardo",
			username: "egodoy",
		});

		expect(response.body.message).toBe('"password" is required');
	});

	test("Should be able to list a Profile", async () => {
		await request(app).post("/profile").send({
			name: "Eduardo",
			username: "egodoy",
			password: "12345678",
		});

		const response = await request(app).get("/profile");

		expect(response.body).toEqual([
			{
				id: expect.any(Number),
				name: expect.any(String),
				password: expect.any(String),
				username: expect.any(String),
			},
		]);
	});

	test("Should be able to delete a Profile", async () => {
		await request(app).post("/profile").send({
			name: "Eduardo",
			username: "egodoy",
			password: "12345678",
		});

		const response = await request(app).delete("/profile/egodoy");

		expect(response.status).toBe(204);
	});

	test("Should not be able to delete a Profile", async () => {
		await request(app).post("/profile").send({
			name: "Eduardo",
			username: "egodoy",
			password: "12345678",
		});

		const response = await request(app).delete("/profile/:id");

		expect(response.status).toBe(400);
	});

	test("When you try edit a Profile with username on param", async () => {
		await request(app).post("/profile").send({
			name: "Eduardo",
			username: "egodoy",
			password: "12345678",
		});

		const response = await request(app).put("/profile/egodoy").send({
			name: "Eduardo",
			username: "erossi",
		});

		expect(response.status).toBe(204);
	});

	/**
	 * Store Tests
	 */

	test("Should be able to create a new Store", async () => {
		const response = await request(app).post("/store").send({
			name: "Plakkar",
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		expect(response.status).toBe(200);
	});

	test("When you try create a new Store without name on body request", async () => {
		const response = await request(app).post("/store").send({
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		expect(response.body.message).toBe('"name" is required');
	});

	test("When you try create a new Store without cnpj on body request", async () => {
		const response = await request(app).post("/store").send({
			name: "Plakkar",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		expect(response.body.message).toBe('"cnpj" is required');
	});

	test("Should be able to list a Store", async () => {
		await request(app).post("/store").send({
			name: "Plakkar",
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		const response = await request(app).get("/store");

		expect(response.body).toEqual([
			{
				id: expect.any(Number),
				name: expect.any(String),
				cnpj: expect.any(String),
				cod_emp: expect.any(String),
				serv_ip: expect.any(String),
			},
		]);
	});

	test("Should be able to delete a Store", async () => {
		await request(app).post("/store").send({
			name: "Plakkar",
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		const response = await request(app).delete("/store/53091821000147");

		expect(response.status).toBe(204);
	});

	test("Should not be able to delete a Store", async () => {
		await request(app).post("/store").send({
			name: "Plakkar",
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		const response = await request(app).delete("/store/:id");

		expect(response.status).toBe(400);
	});

	test("Should be able to edit a Store", async () => {
		await request(app).post("/store").send({
			name: "Plakkar",
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		const response = await request(app).put("/store/53091821000147").send({
			name: "Linx",
			cnpj: "53091821000147",
			cod_emp: "PLAK0001",
			serv_ip: "10.1.230.4",
		});

		expect(response.status).toBe(204);
	});

	/**
	 * Server Tests
	 */

	test("Should be able to create a new Server", async () => {
		const response = await request(app).post("/server").send({
			name: "Via Veneto",
			ip: "10.1.3.3",
		});

		expect(response.status).toBe(200);
	});

	test("When you try create a new Server without name on body request", async () => {
		const response = await request(app).post("/server").send({
			ip: "10.1.3.3",
		});

		expect(response.body.message).toBe('"name" is required');
	});

	test("When you try create a new Server without ip on body request", async () => {
		const response = await request(app).post("/server").send({
			name: "Via Veneto",
		});

		expect(response.body.message).toBe('"ip" is required');
	});

	test("Should be able to delete a Server", async () => {
		await request(app).post("/server").send({
			name: "Via Veneto",
			ip: "10.1.3.3",
		});

		const response = await request(app).delete("/server/Via Veneto");

		expect(response.status).toBe(204);
	});

	test("Should not be able to delete a Server", async () => {
		await request(app).post("/server").send({
			name: "Via Veneto",
			ip: "10.1.3.3",
		});

		const response = await request(app).delete("/profile/:id");

		expect(response.status).toBe(400);
	});
});
