let express = require("express"),
  io = require("socket.io"),
  http = require('http'),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  config = require("./config"),
  mongoose = require("./logic/mongodb/connect"),
  port = process.env.PORT || config.port;

let entryRouter = require("./routes/entry"),
  goodsRouter = require("./routes/goods"),
  countryRouter = require("./routes/country"),
  productTypeRouter = require("./routes/productType"),
  storeRouter = require("./routes/store"),
  authRouter = require("./routes/auth"),
  deviceRouter = require("./routes/device"),
  errorRouter = require("./routes/error");

let app = express(),
  SocketIo;

http = http.Server(app);
SocketIo = io(http);
app.set("dir", __dirname);
app.set("socketServet", SocketIo);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("*", entryRouter);
app.use("/goods", goodsRouter);
app.use("/country", countryRouter);
app.use("/producttype", productTypeRouter);
app.use("/store", storeRouter);
app.use("/authorization", authRouter);
app.use("/device", deviceRouter);
app.use(errorRouter.error);
app.use(errorRouter.devError);

http.listen(port, () => {
  console.log(`Listening on port ${port}\nhttp://localhost:${port}`);
});