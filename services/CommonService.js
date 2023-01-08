import axios from "axios";

const api_prefix = "api/";

const apis = {
  "count" : api_prefix + "count",
}

export function count(){
  return axios.get(apis.count);
}


// Data quality score, trends, publication impacts API is missin
