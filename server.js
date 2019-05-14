let express = require("express"),
  http = require('http'),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  config = require("./config"),
  mongoose = require("./logic/mongodb/connect"),
  port = process.env.PORT || config.port;

let entryRouter = require("./routes/entry"),
  
  errorRouter = require("./routes/error");

let app = express();

http = http.Server(app);
app.set("dir", __dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("*", entryRouter);
//app.use("/projects", projectsRouter);
//app.use("/authorization", authRouter);

app.use(errorRouter.error);
app.use(errorRouter.devError);

http.listen(port, () => {
  console.log(`Listening on port ${port}\nhttp://localhost:${port}`);
});