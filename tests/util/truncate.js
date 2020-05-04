const database = require("../../src/database");

module.exports = function truncate() {
	return Promise.all(
		Object.keys(database.models).map((key) => {
			return database.models[key].destroy({
				truncate: true,
				force: true,
			});
		})
	);
};
