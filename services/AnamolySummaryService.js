import axios from "axios";

const api_prefix = "api/getAnamolySummaries/";

const apis = {
  "get" : api_prefix + "getAnamolySummaries",
//  "getTestSummaries": api_prefix + "getRuleTestSummaries",
  //"getLandingZoneProfiles": api_prefix + "getLandingZoneProfiles"
}

export function getAnomalieSummaries() {
  return axios.get(apis.get);
}

// export function getRuleTestSummaries() {
//   return axios.get(apis.getTestSummaries)
// }

// export function getLandingZoneProfiles() {
//   return axios.get(apis.getLandingZoneProfiles)
// }