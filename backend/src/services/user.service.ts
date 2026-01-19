import { supabase } from "../config/supabase";

export const getUserById = async (id: string) => {
  return supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
};

export const getAllUsers = async () => {
  return supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });
};

export const createUser = async (data: any) => {
  return supabase.from("users").insert(data);
};

export const updateUser = async (id: string, data: any) => {
  return supabase
    .from("users")
    .update(data)
    .eq("id", id);
};

export const updateUserRole = async (id: string, role: string) => {
  return supabase
    .from("users")
    .update({ role })
    .eq("id", id);
};

export const verifyUser = async (id: string) => {
  return supabase
    .from("users")
    .update({ verified: true })
    .eq("id", id);
};