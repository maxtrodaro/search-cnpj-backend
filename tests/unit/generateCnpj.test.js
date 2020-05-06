const generatorCnpj = require("../util/generateFakerCnpj");

describe("Generate CNPJ", () => {
	test("should generate an CNPJ", () => {
		const cnpj = generatorCnpj().toString();

		expect(cnpj).toHaveLength(14);
	});
});
