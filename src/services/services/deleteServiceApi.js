import { supabase } from "../supabaseLocal";

export default async function deleteServiceApi(id) {
  const { data, error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Service not found or already deleted");
  }

  return data[0];
}
