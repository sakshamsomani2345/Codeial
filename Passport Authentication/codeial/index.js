const express=require("express");
const cookieparser = require("cookie-parser");
const app=express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session=require("express-session");
//acquire passport
const passport = require("passport");
const passportLocal= require("./config/passport-local-strategy");
const { cookie } = require("express/lib/response");
const cookieParser = require("cookie-parser");
const MongoStore=require("connect-mongo")(session)
const { disabled } = require("express/lib/application");
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("assets"));
app.use(expressLayouts)
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set the view engine
app.set("view engine", "ejs");
app.set('views','./views')
app.engine("ejs", require("ejs").__express);

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "Codeial",
    //todo change the secret before production mode
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
// use express router
app.use("/", require("./routes"));

///run the server
app.listen(8000,function(err){
    if(err){
        console.log(err);
    }
    console.log("successfull");
})