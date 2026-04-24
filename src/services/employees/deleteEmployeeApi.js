export default async function deleteEmployeeApi(id) {
  const response = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const datas = await response.json();
  return datas;
}

// API locale (dev)
// import { supabase } from "../supabaseLocal";

// export default async function deleteEmployeeApi(id) {
//   const { data, error } = await supabase
//     .from("employees")
//     .delete()
//     .eq("id", id)
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   if (!data || data.length === 0) {
//     throw new Error("Employee not found or already deleted");
//   }

//   const deletedEmployee = data[0];

//   return {
//     id: deletedEmployee.id,
//     firstName: deletedEmployee.first_name,
//     lastName: deletedEmployee.last_name,
//     position: deletedEmployee.position,
//     service: deletedEmployee.service,
//     email: deletedEmployee.email,
//     entryDate: deletedEmployee.entry_date,
//     status: deletedEmployee.status,
//   };
// }
