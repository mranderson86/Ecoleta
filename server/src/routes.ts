import express from "express";
import { celebrate, Joi } from "celebrate";

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

Routes.post(
  "/points",
  upload.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().max(2),
      items: Joi.string().required(),
    }),
  }),
  pointsController.create
);

export default Routes;
