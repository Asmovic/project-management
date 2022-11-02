const path = require("path");
const express = require("express");
const Colors = require("colors");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const dotEnv = require("dotenv");

dotEnv.config();

const connectDB = require("./config/db");
const schema = require("./schema/schema");

const app = express();

// Connect to Database
connectDB();

// Accept Preflight Requests
app.use(cors());

// Serve GraphiQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Serve static Files
app.use(express.static(path.join(__dirname, "public")));

app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`App running at PORT: ${PORT}`));
