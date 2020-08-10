const express = require("express");
const authRoutes = require("./routes/authRoutes");

//services
require("./services/passport");

const app = express();

//Route handler
authRoutes(app);

// process.env.PORT for production only
const PORT = process.env.PORT || 5000;
app.listen(PORT);
