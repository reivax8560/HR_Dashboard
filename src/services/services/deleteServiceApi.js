import apiRequest from "../apiRequest";

export default function deleteServiceApi(id) {
  return apiRequest(`/api/services/${id}`, { method: "DELETE" });
}
