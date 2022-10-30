const express = require("express");
const Colors = require("colors");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const connectDB = require("./config/db");
const schema = require("./schema/schema");

const app = express();

// Connect to Database
connectDB();

// Accept Preflight Requests
app.use(cors());

// Serve static Files
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Serve GraphiQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`App running at PORT: ${PORT}`));
