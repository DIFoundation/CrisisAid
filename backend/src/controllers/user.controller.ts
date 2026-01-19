import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const fetchCurrentUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { data, error } = await UserService.getUserById(user.id);
  if (error) return res.status(400).json(error);
  if (!data) return res.status(404).json({ message: "User not found" });
  res.json(data);
};

export const fetchAllUsers = async (_: Request, res: Response) => {
  const { data, error } = await UserService.getAllUsers();
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { error } = await UserService.updateUser(user.id, req.body);
  if (error) return res.status(400).json(error);
  res.json({ message: "User updated successfully" });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const { error } = await UserService.updateUserRole(id as string, role);
  if (error) return res.status(400).json(error);
  res.json({ message: "User role updated successfully" });
};

export const verifyUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await UserService.verifyUser(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "User verified successfully" });
};