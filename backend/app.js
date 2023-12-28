const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Banco
const conn = require("./db/conn.js");
conn();

// Rotas
const routes = require("./routes/router.js"); 
app.use("/api", routes);


app.use(express.json());

app.listen(3000, () => {
  console.log("server on");
});
