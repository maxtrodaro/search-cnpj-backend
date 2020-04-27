const ServerStore = require("../models/Server");
const yup = require("yup");

module.exports = {
	async getServer(request, response) {
		const server = await ServerStore.findAll();

		if (server.length < 1) {
			return response.json({ error: `Don't have servers yet.` });
		}

		return response.json(server);
	},

	async postServer(request, response) {
		const schema = yup.object().shape({
			name: yup.string().required(),
			ip: yup.string().required().min(8).max(15),
		});

		if (!(await schema.isValid(request.body))) {
			return response.status(400).json({ error: "Validation fails." });
		}

		const server = await ServerStore.findOne({
			where: {
				ip: request.body.ip,
			},
		});

		if (server) {
			return response.status(400).json({ error: "Server already exists." });
		}

		const { name, ip } = await ServerStore.create(request.body);

		return response.status(200).json({
			name,
			ip,
		});
	},

	async deleteServer(request, response) {
		const { ip } = request.params;

		const server = await ServerStore.findOne({
			where: {
				ip: ip,
			},
		});

		if (!server) {
			return response.status(400).json({ error: "Server don't find" });
		}

		await server.destroy();

		return response.status(204).json();
	},
};
