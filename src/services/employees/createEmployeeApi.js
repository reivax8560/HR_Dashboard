export default async function createEmployeeApi(employee) {
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return await response.json();
}

// API locale (dev)
// import { supabase } from "../supabaseLocal";

// export default async function createEmployeeApi(employee) {
//   const formattedEmployee = {
//     id: employee.id,
//     first_name: employee.firstName,
//     last_name: employee.lastName,
//     position: employee.position,
//     service: employee.service,
//     email: employee.email,
//     entry_date: employee.entryDate,
//     status: employee.status,
//   };

//   const { data, error } = await supabase
//     .from("employees")
//     .insert([formattedEmployee])
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   const newEmployee = data[0];

//   return {
//     id: newEmployee.id,
//     firstName: newEmployee.first_name,
//     lastName: newEmployee.last_name,
//     position: newEmployee.position,
//     service: newEmployee.service,
//     email: newEmployee.email,
//     entryDate: newEmployee.entry_date,
//     status: newEmployee.status,
//   };
// }
