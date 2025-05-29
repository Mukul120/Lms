
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const { dbConnection } = require("./src/config/dbConnection");
const authRoutes = require("./src/Routes/auth.Routes");
const cookieParser = require("cookie-parser");
const studentRoutes = require("./src/Routes/user.Routes");
const adminRoutes = require("./src/Routes/admin.Routes");
const courseRoute = require("./src/Routes/course.Routes");
const cors = require("cors");
const events = require("events");

events.defaultMaxListeners = 20;

dotenv.config();
dbConnection();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

// ✅ Increase server timeout 
server.timeout = 1800000; // 30 minutes
server.keepAliveTimeout = 1800000;

// ✅ Prevent per-request timeout
app.use((req, res, next) => {
  req.setTimeout(0); // unlimited
  res.setTimeout(0);
  next();
});

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "https://lms-frontend-e4jp.onrender.com",
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/course", courseRoute);
app.use("/admin", adminRoutes);

// ✅ Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
