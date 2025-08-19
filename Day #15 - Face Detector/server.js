const https = require("https");
const express = require("express");

const app = express();
const secureExpress = https.createServer(app);

app.use(express.static("public"));
secureExpress.listen(5000);
