import apiRequest from "../apiRequest";

export default function createServiceApi(service) {
  return apiRequest("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
}
