import { supabase } from "../supabaseLocal";

export default async function createServiceApi(service) {
  const { data, error } = await supabase
    .from("services")
    .insert([service])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
