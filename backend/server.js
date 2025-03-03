import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json()); // allows us to accept json data in body

app.use("/api/products", router);

app.listen(PORT, () => {
  connectDB();
  console.log("app is listening via port " + PORT);
});

// alibatikan1
// c6Eh0GcCPvAb7B81
