import { Request, Response } from "express";
import * as ResourceService from "../services/resource.service";

export const fetchResources = async (_: Request, res: Response) => {
  const { data, error } = await ResourceService.getResources();
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const addResource = async (req: Request, res: Response) => {
  const { error } = await ResourceService.createResource(req.body);
  if (error) return res.status(400).json(error);
  res.status(201).json({ message: "Resource created" });
};
