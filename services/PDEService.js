import axios from "axios";

const api_prefix = "api/";

const apis = {
  "pda" : api_prefix + "pda",
  "pdesummary": api_prefix + "pda/pdeSumm",
  "execpde": api_prefix + "pda/execpde",
  "profiledMetadata": api_prefix + "pda/sourceProfiler"
}

export function pda(){
  return axios.get(apis.pda);
}

export function getExecPDE() {
  return axios.get(apis.execpde)
}

export function getpdeSumm() {
  return axios.get(apis.pdesummary)
}

export function getProfiledMetadata() {
  return axios.get(apis.profiledMetadata)
}