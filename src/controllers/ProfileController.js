const Profile = require("../models/Profile");
const yup = require("yup");

const generateToken = require("../util/Token/generateToken");

module.exports = {
	async getProfile(request, response) {
		const profile = await Profile.findAll();

		if (profile.length < 1) {
			return response.json({ error: `Não existem usuários ainda` });
		}
		return response.json(profile);
	},

	async postProfile(request, response) {
		const schema = yup.object().shape({
			name: yup.string().required(),
			username: yup.string().required(),
			password: yup.string().required().min(8),
			permission: yup.string().required(),
		});

		if (!(await schema.isValid(request.body))) {
			return response
				.status(400)
				.json({ error: "Preencha os campos corretamente" });
		}

		const profile = await Profile.findOne({
			where: { username: request.body.username },
		});

		if (profile) {
			return response.status(400).json({ error: "Este usuário já existe" });
		}

		await Profile.create(request.body);

		return response.status(200).json({
			user: "Usuário cadastrado com sucesso",
		});
	},

	async deleteProfile(request, response) {
		const { username } = request.params;

		const profile = await Profile.findOne({
			where: {
				username: username,
			},
		});

		if (!profile) {
			return response.status(400).json({ error: "Usuário não encontrado" });
		}

		await profile.destroy();

		return response.status(204).send();
	},

	async editProfile(request, response) {
		const { oldUsername } = request.params;

		const schema = yup.object().shape({
			name: yup.string().required(),
			username: yup.string().required(),
			permission: yup.string().required(),
		});

		if (!(await schema.isValid(request.body))) {
			return response
				.status(400)
				.json({ error: "Preencha os campos corretamente" });
		}

		const profile = await Profile.findOne({
			where: {
				username: oldUsername,
			},
		});

		if (!profile) {
			return response.status(400).json({ error: "Usuário não encontrado" });
		}

		await profile.update(request.body);

		return response.status(204).send();
	},
};
