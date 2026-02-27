import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();
 app.use(express.static(path.join(__dirname,'/client/dist')));
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
