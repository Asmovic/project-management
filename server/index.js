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
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`App running at PORT: ${PORT}`));
