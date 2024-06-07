const productRoutes = require("./product.route");
const customerRoutes = require("./customer.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", productRoutes);

  app.use(version + "/customers", customerRoutes);

}