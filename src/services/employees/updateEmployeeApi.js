export default async function updateEmployeeApi(employee) {
  const response = await fetch(`/api/employees/${employee.id}`, {
    method: "PUT",
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

// export default async function updateEmployeeApi(employee) {
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
//     .update(formattedEmployee)
//     .eq("id", employee.id)
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   const updatedEmployee = data[0];

//   return {
//     id: updatedEmployee.id,
//     firstName: updatedEmployee.first_name,
//     lastName: updatedEmployee.last_name,
//     position: updatedEmployee.position,
//     service: updatedEmployee.service,
//     email: updatedEmployee.email,
//     entryDate: updatedEmployee.entry_date,
//     status: updatedEmployee.status,
//   };
// }
