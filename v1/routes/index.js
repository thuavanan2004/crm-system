const productRoutes = require("./product.route");
const customerRoutes = require("./customer.route");
const accountRoutes = require("./account.route");
const authMiddleware = require("../middlewares/auth.middleware");


module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", authMiddleware.requireAuth, productRoutes);

  app.use(version + "/customers", authMiddleware.requireAuth, customerRoutes);

  app.use(version + "/auth", accountRoutes);

}