import express, { response } from "express";
import path from "path";

import Routes from "./routes";

const app = express();
const port = 3333;

app.use(express.json());

app.use(Routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(port, () => console.log("Server is running"));
