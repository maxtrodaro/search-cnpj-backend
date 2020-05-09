"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("stores", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			serv_ip: {
				type: Sequelize.STRING,
				allowNull: false,
				references: { model: "servers", key: "ip" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cnpj: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cod_emp: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			serv_ip: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("stores");
	},
};
