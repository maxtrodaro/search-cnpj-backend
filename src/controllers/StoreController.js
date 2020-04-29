const Store = require("../models/Store");
const yup = require("yup");

module.exports = {
	async getStore(request, response) {
		const store = await Store.findAll();

		if (store.length < 1) {
			return response.json({ error: "Ainda não existem lojas" });
		}

		return response.json(store);
	},

	async postStore(request, response) {
		const schema = yup.object().shape({
			name: yup.string().required(),
			cnpj: yup.string().required().length(14),
			cod_emp: yup.string().required().length(8),
			serv_ip: yup.string().required().min(8).max(15),
		});

		if (!(await schema.isValid(request.body))) {
			return response
				.status(400)
				.json({ error: "Preencha os campos corretamente" });
		}

		const storeCnpj = await Store.findOne({
			where: {
				cnpj: request.body.cnpj,
			},
		});

		const storeCodemp = await Store.findOne({
			where: {
				cod_emp: request.body.cod_emp,
			},
		});

		if (storeCnpj || storeCodemp) {
			return response.status(400).json({ error: "Loja já existente" });
		}

		const { name, cnpj, cod_emp, serv_ip } = await Store.create(request.body);

		return response.status(200).json({
			name,
			cnpj,
			cod_emp,
			serv_ip,
		});
	},

	async deleteStore(request, response) {
		const { cnpj } = request.params;

		const store = await Store.findOne({
			where: {
				cnpj: cnpj,
			},
		});

		if (!store) {
			return response.status(400).json({ error: "Loja não encontrada." });
		}

		await store.destroy();

		return response.status(204).send();
	},

	async editStore(request, response) {
		const { cnpj } = request.params;

		const schema = yup.object().shape({
			name: yup.string().required(),
			cnpj: yup.string().required().length(14),
			cod_emp: yup.string().required().length(8),
			serv_ip: yup.string().required().min(8).max(15),
		});

		if (!(await schema.isValid(request.body))) {
			return response
				.status(400)
				.json({ error: "Preencha os campos corretamente" });
		}

		const store = await Store.findOne({
			where: {
				cnpj: cnpj,
			},
		});

		if (!store) {
			return response.status(400).json({ error: "Loja não encontrada" });
		}

		await store.update(request.body);

		return response.status(204).send();
	},
};
