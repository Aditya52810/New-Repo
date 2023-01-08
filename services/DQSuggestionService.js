import axios from "axios";

const api_prefix = "api/dqsuggestion/";

const apis = {
  "get" : api_prefix + "getSuggestion",
}

export function getSuggestion() {
  return axios.get(apis.get);
}
