import { supabase } from "../supabaseLocal";

export default async function deleteAbsenceApi(id) {
  const { data, error } = await supabase
    .from("absences")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Absence not found or already deleted");
  }

  const deletedAbsence = data[0];

  return {
    id: deletedAbsence.id,
    employeeId: deletedAbsence.employee_id,
    type: deletedAbsence.type,
    startDate: deletedAbsence.start_date,
    endDate: deletedAbsence.end_date,
    status: deletedAbsence.status,
    comment: deletedAbsence.comment,
  };
}
