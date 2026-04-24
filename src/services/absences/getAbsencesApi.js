// API en ligne (prod)
export default async function getAbsencesApi() {
  const response = await fetch("/api/absences");
  if (!response.ok) {
    throw new Error(`${response.status} : ${response.statusText}`);
  }
  const datas = await response.json();
  return datas;
}

// API en local
// import { supabase } from "../supabaseLocal";
// export default async function getAbsencesApi() {
//   const { data, error } = await supabase.from("absences").select("*");

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data.map((absence) => ({
//     id: absence.id,
//     employeeId: absence.employee_id,
//     type: absence.type,
//     startDate: absence.start_date,
//     endDate: absence.end_date,
//     status: absence.status,
//     comment: absence.comment,
//   }));
// }
