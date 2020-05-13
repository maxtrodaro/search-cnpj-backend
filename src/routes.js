const express = require("express");

const storeController = require("./controllers/StoreController");
const searchController = require("./controllers/SearchController");
const profileController = require("./controllers/ProfileController");
const serverController = require("./controllers/ServerController");
const loginController = require("./controllers/LoginController");
const tokenController = require("./controllers/TokenController");

const authMiddleware = require("./middlewares/authorization");

const routes = express.Router();

routes.get("/store", storeController.getStore);
routes.get("/store/:ip", storeController.getStoresWithServer);
routes.post("/server/:serv_ip/store", storeController.postStore);
routes.delete("/store/:cnpj", storeController.deleteStore);
routes.put("/store/:cnpj", storeController.editStore);

routes.get("/searchStore", searchController.getStore);

routes.get("/profile", profileController.getProfile);
routes.post("/profile", profileController.postProfile);
routes.delete("/profile/:username", profileController.deleteProfile);
routes.put("/profile/:oldUsername", profileController.editProfile);

routes.get("/server", serverController.getServer);
routes.post("/server", serverController.postServer);
routes.delete("/server/:ip", serverController.deleteServer);

routes.post("/authenticate", loginController.jwtProfile);

routes.use(authMiddleware);
routes.get("/token", tokenController.getToken);

module.exports = routes;
