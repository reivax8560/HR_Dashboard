export default async function updateServiceApi(service) {
  const response = await fetch(`/api/services/${service.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return await response.json();
}

// API locale (dev)
// import { supabase } from "../supabaseLocal";

// export default async function updateServiceApi(service) {
//   const { data, error } = await supabase
//     .from("employees")
//     .update(service)
//     .eq("id", service.id)
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data[0];
// }
