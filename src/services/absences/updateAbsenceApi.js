export default async function updateAbsenceApi(absence) {
  const response = await fetch(`/api/absences/${absence.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(absence),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return await response.json();
}

// API locale (dev)
// import { supabase } from "../supabaseLocal";

// export default async function updateAbsenceApi(absence) {
//   const formattedAbsence = {
//     id: absence.id,
//     employee_id: absence.employeeId,
//     type: absence.type,
//     start_date: absence.startDate,
//     end_date: absence.endDate,
//     status: absence.status,
//     comment: absence.comment,
//   };

//   const { data, error } = await supabase
//     .from("absences")
//     .update(formattedAbsence)
//     .eq("id", absence.id)
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   const updatedAbsence = data[0];

//   return {
//     id: updatedAbsence.id,
//     employeeId: updatedAbsence.employee_id,
//     type: updatedAbsence.type,
//     startDate: updatedAbsence.start_date,
//     endDate: updatedAbsence.end_date,
//     status: updatedAbsence.status,
//     comment: updatedAbsence.comment,
//   };
// }
