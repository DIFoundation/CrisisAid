import { supabase } from "../config/supabase";

interface ResourceFilters {
  type?: string;
  status?: string;
  verified?: boolean;
}

export const getResources = async (filters: ResourceFilters = {}) => {
  let query = supabase.from("resources").select("*");
  
  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  
  if (filters.verified !== undefined) {
    query = query.eq("verified", filters.verified);
  }
  
  return query.order("created_at", { ascending: false });
};

export const getResourceById = async (id: string) => {
  return supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .single();
};

export const searchByLocation = async (
  latitude: number,
  longitude: number,
  radiusKm: number = 10
) => {
  // Note: This is a simplified version. For production, you'd want to use PostGIS
  // or implement proper geospatial queries
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .not("latitude", "is", null)
    .not("longitude", "is", null);
  
  if (error) return { data: null, error };
  
  // Filter by distance (simplified Haversine formula)
  const filtered = data?.filter((resource) => {
    const R = 6371; // Earth's radius in km
    const dLat = (resource.latitude - latitude) * (Math.PI / 180);
    const dLon = (resource.longitude - longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitude * (Math.PI / 180)) *
        Math.cos(resource.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance <= radiusKm;
  });
  
  return { data: filtered, error: null };
};

export const createResource = async (data: any) => {
  return supabase.from("resources").insert(data);
};

export const updateResource = async (id: string, data: any) => {
  return supabase
    .from("resources")
    .update(data)
    .eq("id", id);
};

export const verifyResource = async (id: string) => {
  return supabase
    .from("resources")
    .update({ verified: true })
    .eq("id", id);
};

export const deleteResource = async (id: string) => {
  return supabase
    .from("resources")
    .delete()
    .eq("id", id);
};