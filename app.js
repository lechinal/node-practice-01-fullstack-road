const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware.js");

const app = express();

dotenv.config();

// middleware
app.use(express.static("public"));
// pe a folosi static files ca .css, imagini, trebuie specificat fisierul in care se afla, in cazul nostru "public"

app.use(express.json());
app.use(cookieParser());

// configurare mecanismul de vizualizare pt a utiliza EJS ca motor de sabloane:
app.set("view engine", "ejs");
// pentru partea de frontend, specificam views si folosim "ejs"(embedded JavaScript)
// cand folosim extensia .ejs pt fisierele de sabloane, serverul le interpreteaza ca fiind sabloane EJS si le proceseaza in consecinta.

// database connection
const PORT = process.env.PORT_SERVER || 5000;
const db_URL = process.env.DB_URL;

mongoose
  .connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/paths", requireAuth, (req, res) => res.render("paths"));
app.get("/next-paths", requireAuth, (req, res) => res.render("nextPaths"));
app.use(authRoutes);
