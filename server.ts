import express from "express";
import path from "path";
import { connectDB } from "./config/db";
import auth from "./routes/auth";
import cars from "./routes/cars";
import reservations from "./routes/reservations";
import stations from "./routes/stations";
import users from "./routes/users";

require("dotenv").config();
const app = express();

//Connect DB

connectDB();

// Init middleware

app.use(
  express.json({
    inflate: false,
  })
);

// Define routes

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/stations", stations);
app.use("/api/cars", cars);
app.use("/api/reservations", reservations);

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  //Set static folder

  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
