import express from "express";
import { checkAllLinks } from "./checkLinks.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("UptimeX backend running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// تحقق كل 5 دقايق
setInterval(checkAllLinks, 5 * 60 * 1000);
