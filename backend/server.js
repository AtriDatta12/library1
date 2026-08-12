const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cors());
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/books", bookRoutes);
app.get("/", (req, res) => {
    res.send("Library Management API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});