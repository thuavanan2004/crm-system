const express = require("express");
const AdminBro = require('admin-bro');
const expressAdmin = require('@admin-bro/express');
const adminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const database = require("./config/database");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const routeAdmin = require("./v1/routes/index");


const app = express();
const env = require("dotenv");
const Account = require("./v1/models/account.model");
env.config();
const port = process.env.PORT;

database.connect();

AdminBro.registerAdapter(adminBroMongoose);
const adminBroOptions = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  loginPath: '/admin/login',
});

const router = expressAdmin.buildAuthenticatedRouter(adminBroOptions, {
  authenticate: async (email, password) => {
    const admin = await Account.findOne({
      email: email
    });

    if (admin) {
      const matched = await bcrypt.compare(password, admin.password);
      if (matched) {
        return admin;
      }
    }
    return false;
  },
  cookiePassword: crypto.randomBytes(32).toString('hex'),
});

// const router = expressAdmin.buildRouter(adminBroOptions);

app.use(adminBroOptions.options.rootPath, router);

app.use(bodyParser.json());

routeAdmin(app);

app.listen(port, () => {
  console.log(`App đang lắng nghe cổng ${port} `)
});