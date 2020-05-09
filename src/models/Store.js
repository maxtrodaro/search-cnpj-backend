const { Model, DataTypes } = require("sequelize");

class Store extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				cnpj: DataTypes.STRING,
				cod_emp: DataTypes.STRING,
			},
			{
				sequelize: connection,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Server, { foreignKey: "serv_ip", as: "server" });
	}
}

module.exports = Store;
