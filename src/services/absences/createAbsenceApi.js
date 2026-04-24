export default async function createAbsenceeApi(absence) {
  const response = await fetch("/api/absences", {
    method: "POST",
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

// export default async function createAbsenceApi(absence) {
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
//     .insert([formattedAbsence])
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   const newAbsence = data[0];

//   return {
//     id: newAbsence.id,
//     employeeId: newAbsence.employee_id,
//     type: newAbsence.type,
//     startDate: newAbsence.start_date,
//     endDate: newAbsence.end_date,
//     status: newAbsence.status,
//     comment: newAbsence.comment,
//   };
// }
