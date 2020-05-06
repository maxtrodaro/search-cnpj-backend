const { Model, DataTypes } = require("sequelize");
const bscrypt = require("bcryptjs");

class Profile extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				username: DataTypes.STRING,
				permission: DataTypes.STRING,
				password: DataTypes.VIRTUAL,
				password_hash: DataTypes.STRING,
			},
			{
				sequelize: connection,
			}
		);

		this.addHook("beforeSave", async (profile) => {
			if (profile.password) {
				profile.password_hash = await bscrypt.hash(profile.password, 8);
			}
		});

		return this;
	}

	checkPassword(password) {
		return bscrypt.compare(password, this.password_hash);
	}
}

module.exports = Profile;
