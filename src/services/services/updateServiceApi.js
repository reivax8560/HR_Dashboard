import apiRequest from "../apiRequest";

export default function updateServiceApi(service) {
  return apiRequest(`/api/services/${service.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
}
