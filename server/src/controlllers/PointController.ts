import { Request, Response } from "express";
import tables from "../database/connection";

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await tables.transaction();

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const ids = await trx("points").insert(point);

    const point_id = ids[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("points_items").insert(pointItems);

    return response.json({ ...point, id: point_id });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await tables("points").where("id", id).first();

    if (!point) {
      response.status(400).json({ message: "Point not found" });
    }

    return response.json(point);
  }
}

export default PointsController;
