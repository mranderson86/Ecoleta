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

    await trx.commit();

    return response.json({ ...point, id: point_id });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await tables("points").where("id", id).first();

    if (!point) {
      response.status(400).json({ message: "Point not found" });
    }

    const items = await tables("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id);

    return response.json({ ...point, items });
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await tables("points")
      .join("points_items", "points.id", "=", "points_items.point_id")
      .whereIn("points_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json(points);
  }
}

export default PointsController;
