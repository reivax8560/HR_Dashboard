import apiRequest from "../apiRequest";

export default function deleteAbsenceApi(id) {
  return apiRequest(`/api/absences/${id}`, { method: "DELETE" });
}
