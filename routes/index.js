const auth = require("./routeAuth");
const product = require("./routeProduct");
const brand = require("./routeBrand");
const type = require("./routeType");
const order = require("./routeOrder");

function routes(app) {
  app.use("/auth", auth);
  app.use("/product", product);
  app.use("/brand", brand);
  app.use("/type", type);
  app.use("/order", order);
}

module.exports = routes;
