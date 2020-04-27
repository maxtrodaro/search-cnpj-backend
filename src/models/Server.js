const { Model, DataTypes } = require("sequelize");

class Server extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				ip: DataTypes.STRING,
			},
			{
				sequelize: connection,
			}
		);
	}
}

module.exports = Server;
