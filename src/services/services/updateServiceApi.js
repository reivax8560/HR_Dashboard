import { supabase } from "../supabaseLocal";

export default async function updateServiceApi(service) {
  const { data, error } = await supabase
    .from("employees")
    .update(service)
    .eq("id", service.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
