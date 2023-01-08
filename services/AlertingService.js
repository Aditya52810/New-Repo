import axios from "axios";

const api_prefix = "api/getAlertingSummary/";
const api_prefix1="api/getAlertingSummary1";

const apis = {
  "get" : api_prefix + "getAlertingSummary",
//  "getTestSummaries": api_prefix + "getRuleTestSummaries",
  //"getLandingZoneProfiles": api_prefix + "getLandingZoneProfiles"
}
const apis1 = {
  "get" : api_prefix1 + "getAlertingSummary1",
//  "getTestSummaries": api_prefix + "getRuleTestSummaries",
  //"getLandingZoneProfiles": api_prefix + "getLandingZoneProfiles"
}

export function getAlertingSummary() {
  return axios.get(apis.get);
}
export function getAlertingSummary1() {
  return axios.get(apis1.get);
}

// export function getRuleTestSummaries() {
//   return axios.get(apis.getTestSummaries)
// }

// export function getLandingZoneProfiles() {
//   return axios.get(apis.getLandingZoneProfiles)
// }