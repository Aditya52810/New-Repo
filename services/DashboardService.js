import axios from "axios";

const api_prefix = "api/";

const apis = {
  "score" : api_prefix + "dash",
  "health": api_prefix + "dash/health"
}

export function score(){
  return axios.get(apis.score);
}

export function healthTrend() {
  return axios.get(apis.health)
}
// Data quality score, trends, publication impacts API is missin
