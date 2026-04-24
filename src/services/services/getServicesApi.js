export default async function getServicesApi() {
  const response = await fetch("/api/services");
  if (!response.ok) {
    throw new Error(`${response.status} : ${response.statusText}`);
  }
  const datas = await response.json();
  return datas;
}

// API local
// import { supabase } from "../supabaseLocal";

// export default async function getServicesApi() {
//   const { data, error } = await supabase.from("services").select("*");

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }
