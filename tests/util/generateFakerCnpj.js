module.exports = function generateFakerCnpj() {
	return Math.floor(10000000000000 + Math.random() * 90000000000000);
};
