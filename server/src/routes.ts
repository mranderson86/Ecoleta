import express from "express";

const Routes = express.Router();

Routes.get("/users", (request, response) => {
  response.json({ message: "Your users" });
});

export default Routes;
