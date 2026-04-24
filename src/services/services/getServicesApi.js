import { supabase } from "../supabaseLocal";
// API local
export default async function getServicesApi() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// API en ligne (prod)
// export default async function fetchServices() {
//   const response = await fetch("/api/services");
//   if (!response.ok) {
//     throw new Error(`${response.status} : ${response.statusText}`);
//   }
//   const datas = await response.json();
//   return datas;
// }
