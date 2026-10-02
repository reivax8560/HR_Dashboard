import apiRequest from "../apiRequest";

export default function getServicesApi() {
  return apiRequest("/api/services");
}
