"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("servers", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ip: {
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
		return queryInterface.dropTable("servers");
	},
};
