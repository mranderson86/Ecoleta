import express from "express";
import multer from "multer";

import PointsController from "./controlllers/PointController";
import ItemsController from "./controlllers/ItemsController";

import multerConfig from "./config/multer";

const Routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

Routes.get("/items", itemsController.index);

Routes.get("/points/:id", pointsController.show);
Routes.get("/points", pointsController.index);

Routes.post("/points", upload.single("image"), pointsController.create);

export default Routes;
