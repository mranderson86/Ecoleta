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
      image: request.file.filename,
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

    const pointItems = items
      .split(",")
      .map((item: string) => item.trim())
      .map((item_id: number) => {
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

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.199:3333/uploads/${point.image}`,
    };

    const items = await tables("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id);

    return response.json({ point: serializedPoint, items });
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

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.0.199:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }
}

export default PointsController;
