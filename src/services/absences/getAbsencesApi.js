import apiRequest from "../apiRequest";

export default function getAbsencesApi() {
  return apiRequest("/api/absences");
}
