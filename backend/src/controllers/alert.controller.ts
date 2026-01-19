import { Request, Response } from "express";
import * as AlertService from "../services/alert.service";

export const fetchAlerts = async (_: Request, res: Response) => {
  const { data, error } = await AlertService.getAlerts();
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const fetchActiveAlerts = async (_: Request, res: Response) => {
  const { data, error } = await AlertService.getActiveAlerts();
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const fetchAlertById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await AlertService.getAlertById(id as string);
  if (error) return res.status(400).json(error);
  if (!data) return res.status(404).json({ message: "Alert not found" });
  res.json(data);
};

export const createAlert = async (req: Request, res: Response) => {
  const { error } = await AlertService.createAlert(req.body);
  if (error) return res.status(400).json(error);
  res.status(201).json({ message: "Alert created successfully" });
};

export const updateAlert = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await AlertService.updateAlert(id as string, req.body);
  if (error) return res.status(400).json(error);
  res.json({ message: "Alert updated successfully" });
};

export const deactivateAlert = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await AlertService.deactivateAlert(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "Alert deactivated successfully" });
};

export const deleteAlert = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await AlertService.deleteAlert(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "Alert deleted successfully" });
};