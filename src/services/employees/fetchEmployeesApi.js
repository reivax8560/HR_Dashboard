// API en local
// import { supabase } from "../supabaseLocal";
// export default async function fetchEmployeesApi() {
//   const { data, error } = await supabase.from("employees").select("*");

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data.map((employee) => ({
//     id: employee.id,
//     firstName: employee.first_name,
//     lastName: employee.last_name,
//     position: employee.position,
//     service: employee.service,
//     email: employee.email,
//     entryDate: employee.entry_date,
//     status: employee.status,
//   }));
// }

// API en ligne (prod)
export default async function fetchEmployeesApi() {
  const response = await fetch("/api/employees");
  if (!response.ok) {
    throw new Error(`${response.status} : ${response.statusText}`);
  }
  const datas = await response.json();
  return datas;
}
