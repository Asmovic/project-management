const express = require("express");
const Colors = require("colors");
const cors = require("cors");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const dotEnv = require("dotenv");

dotEnv.config();

const connectDB = require("./config/db");
const schema = require("./schema/schema");

const app = express();
// Accept Preflight Requests
app.use(cors());

// Connect to Database
connectDB();

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
  res.send("<h1>Listening</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App running at PORT: ${PORT}`));
