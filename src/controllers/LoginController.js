const Profile = require("../models/Profile");
const yup = require("yup");
const generateToken = require("../util/Token/generateToken");

module.exports = {
	async jwtProfile(request, response) {
		const schema = yup.object().shape({
			username: yup.string().required(),
			password: yup.string().required(),
		});

		if (!(await schema.isValid(request.body))) {
			return response.status(400).json({ error: "Validations fails" });
		}

		const { username } = request.body;

		const profile = await Profile.findOne({
			where: { username: request.body.username },
		});

		if (!profile) {
			return response.status(400).json({ error: "User not found" });
		}

		if (!(await profile.checkPassword(request.body.password))) {
			return response.status(400).json({ error: "Password does not match" });
		}

		const { id, name } = profile;

		const token = generateToken({ id: profile.id });

		return response.status(200).json({
			user: {
				id,
				name,
				username,
			},
			token,
		});
	},
};
