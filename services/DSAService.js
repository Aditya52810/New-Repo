import axios from "axios";

const api_prefix = "api/dsa";

const apis = {
  "dsa" : api_prefix + "/getDefaultDSA",
  "getDSA": api_prefix + "/getElements",
  "getDSASummary": api_prefix + "/dsaSummary",
  "getMockSummary": api_prefix + "/getMockDSASummary"
}

export function dsa(){
  return axios.get(apis.dsa);
}

export const getDSA = () => {
  return axios.get(apis.getDSA);
}

export const getdsaSummary = () => {
  return axios.get(apis.getDSASummary);
}

export const getMockSummary = () => {
  return axios.get(apis.getMockSummary);
}