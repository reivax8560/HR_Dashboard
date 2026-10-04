import apiRequest from "../apiRequest";

export default function getServiceIdsApi() {
  return apiRequest("/api/services?idsOnly=true");
}
