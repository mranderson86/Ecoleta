import express from "express";

import PointsController from "./controlllers/PointController";
import ItemsController from "./controlllers/ItemsController";

const Routes = express.Router();

const itemsController = new ItemsController();
const pointsController = new PointsController();

Routes.get("/items", itemsController.index);

Routes.post("/points", pointsController.create);
Routes.get("/points/:id", pointsController.show);
Routes.get("/points", pointsController.index);

export default Routes;
