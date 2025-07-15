import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import Role from "./app/models/role.model.js";

// Import routes
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import examRoutes from "./app/routes/exam.routes.js";
import examSetRoutes from "./app/routes/examSet.routes.js";
import studentRoutes from "./app/routes/student.routes.js";
import roleRoutes from "./app/routes/role.routes.js";
import resultRoutes from "./app/routes/result.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "cuonglevant-session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

// Set strictQuery option to suppress deprecation warning
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial(); // Initialize roles
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/examset", examSetRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/result", resultRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
