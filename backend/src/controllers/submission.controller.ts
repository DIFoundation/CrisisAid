import { Request, Response } from "express";
import * as SubmissionService from "../services/submission.service";

export const fetchSubmissions = async (_: Request, res: Response) => {
  const { data, error } = await SubmissionService.getSubmissions();
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const fetchPendingSubmissions = async (_: Request, res: Response) => {
  const { data, error } = await SubmissionService.getPendingSubmissions();
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const fetchMySubmissions = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { data, error } = await SubmissionService.getUserSubmissions(user.id);
  if (error) return res.status(400).json(error);
  res.json(data);
};

export const createSubmission = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const submissionData = {
    ...req.body,
    submitted_by: user.id,
  };
  
  const { error } = await SubmissionService.createSubmission(submissionData);
  if (error) return res.status(400).json(error);
  res.status(201).json({ message: "Submission created successfully" });
};

export const approveSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await SubmissionService.approveSubmission(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "Submission approved successfully" });
};

export const rejectSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await SubmissionService.rejectSubmission(id as string);
  if (error) return res.status(400).json(error);
  res.json({ message: "Submission rejected successfully" });
};