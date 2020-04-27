module.exports = {
	async getToken(request, response) {
		return response.json({ user: request.userId });
	},
};
