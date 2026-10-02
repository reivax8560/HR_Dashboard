import apiRequest from "../apiRequest";

export default function fetchEmployeesApi() {
  return apiRequest("/api/employees");
}
