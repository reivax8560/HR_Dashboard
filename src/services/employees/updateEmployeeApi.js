import apiRequest from "../apiRequest";

export default function updateEmployeeApi(employee) {
  return apiRequest(`/api/employees/${employee.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
}
