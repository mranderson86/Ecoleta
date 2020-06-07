import { Request, Response } from "express";
import tables from "../database/connection";

class ItemsController {
  async create(request: Request, response: Response) { }

  async index(request: Request, response: Response) {
    const items = await tables("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        title: item.title,
        image_url: `http://192.168.0.199:3333/uploads/${item.image}`,
        id: item.id
      };
    });

    return response.json(serializedItems);
  }
}

export default ItemsController;
