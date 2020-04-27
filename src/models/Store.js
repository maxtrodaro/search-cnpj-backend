const { Model, DataTypes } = require("sequelize");

class Store extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				cnpj: DataTypes.STRING,
				cod_emp: DataTypes.STRING,
				serv_ip: DataTypes.STRING,
			},
			{
				sequelize: connection,
			}
		);
	}
}

module.exports = Store;
