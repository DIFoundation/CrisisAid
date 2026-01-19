import { supabase } from "../config/supabase";

export const getResources = async () => {
  return supabase.from("resources").select("*");
};

export const createResource = async (data: any) => {
  return supabase.from("resources").insert(data);
};
