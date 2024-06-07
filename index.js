const express = require("express");
const AdminBro = require('admin-bro');
const expressAdmin = require('@admin-bro/express');
const adminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const database = require("./config/database");
const routeAdmin = require("./v1/routes/index");
const app = express();
const env = require("dotenv");
env.config();
const port = process.env.PORT;

database.connect();

AdminBro.registerAdapter(adminBroMongoose);
const adminBroOptions = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
});
const router = expressAdmin.buildRouter(adminBroOptions);

app.use(adminBroOptions.options.rootPath, router);

app.use(bodyParser.json());

routeAdmin(app);


app.listen(port, () => {
  console.log(`App đang lắng nghe cổng ${port} `)
})