import apiRequest from "../apiRequest";

export default function deleteEmployeeApi(id) {
  return apiRequest(`/api/employees/${id}`, { method: "DELETE" });
}
