export default async function createServiceApi(service) {
  const response = await fetch("/api/services", {
    method: "POST",
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

// export default async function createServiceApi(service) {
//   const { data, error } = await supabase
//     .from("services")
//     .insert([service])
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data[0];
// }
