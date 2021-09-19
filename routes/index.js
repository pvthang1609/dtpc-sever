const auth = require("./routeAuth");
const product = require("./routeProduct");
const brand = require("./routeBrand");
const type = require("./routeType");

function routes(app) {
  app.use("/auth", auth);
  app.use("/product", product);
  app.use("/brand", brand);
  app.use("/type", type);
}

module.exports = routes;
