const Store = require("../models/Store");

module.exports = {
	async getStore(request, response) {
		const cnpj = request.headers.cnpj;

		const store = await Store.findOne({
			where: {
				cnpj: cnpj,
			},
		});

		return response.json(store);
	},
};
