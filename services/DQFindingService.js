import axios from "axios";

const api_prefix = "api/";

const apis = {
  "find" : api_prefix + "dqfindings",
  "submitfinding" : api_prefix + "dqfindings/submitfinding",
}

export function dqfind() {
  return axios.get(apis.find)
}


export function submitfinding(req){
  return axios.post(apis.submitfinding,req)
}
