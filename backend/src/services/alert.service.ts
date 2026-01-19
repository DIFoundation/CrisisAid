import { supabase } from "../config/supabase";

export const getAlerts = async () => {
  return supabase
    .from("alerts")
    .select("*")
    .order("created_at", { ascending: false });
};

export const getActiveAlerts = async () => {
  return supabase
    .from("alerts")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });
};

export const getAlertById = async (id: string) => {
  return supabase
    .from("alerts")
    .select("*")
    .eq("id", id)
    .single();
};

export const createAlert = async (data: any) => {
  return supabase.from("alerts").insert(data);
};

export const updateAlert = async (id: string, data: any) => {
  return supabase
    .from("alerts")
    .update(data)
    .eq("id", id);
};

export const deactivateAlert = async (id: string) => {
  return supabase
    .from("alerts")
    .update({ active: false })
    .eq("id", id);
};

export const deleteAlert = async (id: string) => {
  return supabase
    .from("alerts")
    .delete()
    .eq("id", id);
};