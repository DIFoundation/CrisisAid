import { Request, Response } from "express";
import * as ResourceService from "../services/resource.service";

export const fetchResources = async (req: Request, res: Response) => {
  const { type, status, verified } = req.query;
  const filters = {
    type: type as string,
    status: status as string,
    verified: verified === 'true',
  };
  
  const { data, error } = await ResourceService.getResources(filters);
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const fetchResourceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await ResourceService.getResourceById(id as string);
  if (error) return res.status(400).json(error);
  if (!data) return res.status(404).json({ message: "Resource not found" });
  res.json(data);
};

export const searchResourcesByLocation = async (req: Request, res: Response) => {
  const { latitude, longitude, radius } = req.query;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }
  
  const { data, error } = await ResourceService.searchByLocation(
    parseFloat(latitude as string),
    parseFloat(longitude as string),
    radius ? parseFloat(radius as string) : 10 // Default 10km radius
  );
  
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const addResource = async (req: Request, res: Response) => {
  const { error } = await ResourceService.createResource(req.body);
  if (error) return res.status(400).json(error);
  res.status(201).json({ message: "Resource created" });
};

export const updateResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await ResourceService.updateResource(id as string, req.body);
  if (error) return res.status(400).json(error);
  res.json({ message: "Resource updated successfully" });
};

export const verifyResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await ResourceService.verifyResource(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "Resource verified successfully" });
};

export const deleteResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await ResourceService.deleteResource(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "Resource deleted successfully" });
};