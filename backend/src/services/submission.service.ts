import { supabase } from "../config/supabase";

export const getSubmissions = async () => {
  return supabase
    .from("submissions")
    .select("*, users(name, email)")
    .order("created_at", { ascending: false });
};

export const getPendingSubmissions = async () => {
  return supabase
    .from("submissions")
    .select("*, users(name, email)")
    .eq("status", "PENDING")
    .order("created_at", { ascending: false });
};

export const getUserSubmissions = async (userId: string) => {
  return supabase
    .from("submissions")
    .select("*")
    .eq("submitted_by", userId)
    .order("created_at", { ascending: false });
};

export const createSubmission = async (data: any) => {
  return supabase.from("submissions").insert(data);
};

export const approveSubmission = async (id: string) => {
  return supabase
    .from("submissions")
    .update({ status: "APPROVED" })
    .eq("id", id);
};

export const rejectSubmission = async (id: string) => {
  return supabase
    .from("submissions")
    .update({ status: "REJECTED" })
    .eq("id", id);
};