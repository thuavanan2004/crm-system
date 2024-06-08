const productRoutes = require("./product.route");
const customerRoutes = require("./customer.route");
const accountRoutes = require("./auth.route");
const authMiddleware = require("../middlewares/auth.middleware");


module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", authMiddleware.authenticateToken, productRoutes);

  app.use(version + "/customers", authMiddleware.authenticateToken, customerRoutes);

  app.use(version + "/auth", accountRoutes);

}