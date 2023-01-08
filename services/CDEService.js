import axios from "axios";

const api_prefix = "api/";

const apis = {
  "cda" : api_prefix + "cda",
}

export function cda(){
  return axios.get(apis.cda);
}

