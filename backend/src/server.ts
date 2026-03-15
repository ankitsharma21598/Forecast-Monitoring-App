import express from "express";
import cors from "cors";

import windRoutes from "./routes/windRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests from the frontend
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/wind", windRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
