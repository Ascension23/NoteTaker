const express = require("express");

const app = express();

const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/apiRoutes")

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(htmlRoutes)
app.use(apiRoutes)

// app.listen(PORT, () => {
//     console.log(`App listening on PORT: ${PORT}`);
// });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!"+ " ...Click on the link: " +"http://localhost:3000/");
  });

