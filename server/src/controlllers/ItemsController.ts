import { Request, Response } from "express";
import tables from "../database/connection";

class ItemsController {
  async create(request: Request, response: Response) {}

  async index(request: Request, response: Response) {
    const items = await tables("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}

export default ItemsController;
