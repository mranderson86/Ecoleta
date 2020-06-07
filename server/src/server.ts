import express, { response } from "express";
import path from "path";
import cors from "cors";
import { errors } from "celebrate";

import Routes from "./routes";

const app = express();
const port = 3333;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(Routes);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

// Validações
app.use(errors());

app.listen(port, () => console.log("Server is running"));
