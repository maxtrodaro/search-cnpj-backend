const Store = require("../models/Store");
const ServerStore = require("../models/Server");
const yup = require("yup");

module.exports = {
	async getStore(request, response) {
		const store = await Store.findAndCountAll();

		if (store.length < 1) {
			return response.json({ error: "Ainda não existem lojas" });
		}

		return response.json(store);
	},

	async postStore(request, response) {
		const schemaBody = yup.object().shape({
			name: yup.string().required(),
			cnpj: yup.string().required().length(14),
			cod_emp: yup.string().required().length(8),
		});

		const schemaParam = yup.object().shape({
			serv_ip: yup.string().required().min(8).max(15),
		});

		if (
			!(await schemaBody.isValid(request.body)) ||
			!(await schemaParam.isValid(request.params))
		) {
			return response
				.status(400)
				.json({ error: "Preencha os campos corretamente" });
		}

		const { serv_ip } = request.params;
		const { name, cnpj, cod_emp } = request.body;

		const server = await ServerStore.findOne({
			where: {
				ip: serv_ip,
			},
		});

		if (!server) {
			return response.status(400).json({ error: "Servidor não encontrado" });
		}

		const validStore = await Store.findOne({
			where: {
				cod_emp: cod_emp,
				serv_ip: serv_ip,
			},
		});

		if (validStore) {
			return response.status(400).json({ error: "Loja já cadastrada" });
		}

		await Store.create({
			name,
			cnpj,
			cod_emp,
			serv_ip,
		});

		return response.json("Loja Cadastrada!");
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
