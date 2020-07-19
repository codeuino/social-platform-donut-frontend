const { createProxyMiddleware } = require("http-proxy-middleware");
let url;
if (process.env.NODE_ENV === "production") {
  url = "https://codeuino-donut-development.herokuapp.com";
} else {
  url = "http://localhost:5000";
}

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${url}`,
      changeOrigin: true,
    })
  );
};
