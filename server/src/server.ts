import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import run from "./connect";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});

run()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Impossible de démarrer le serveur:", err);
  });
