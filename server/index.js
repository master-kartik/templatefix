import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
const __dirname = path.resolve();

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, "/client/dist")));

// API routes
app.use("/api/tasks", taskRoutes);

// Catch-all route for serving the frontend
app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).send("API route not found");
  }
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
