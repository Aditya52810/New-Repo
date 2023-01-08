import axios from "axios";

const api_prefix = "api/dqruledata/";

const apis = {
  "get": api_prefix + "getRule",
  "getSourceData": api_prefix + "getSourceData",
 // "get": api_prefix + "dQRuleList",
  "submit" : api_prefix + "submitRecord",
  "edit": api_prefix + "editDQRuleData",
  "clone": api_prefix + "cloneDQRuleData",
  "delete": api_prefix + "deleteDQRuleData",
  "runNow": api_prefix + "executeNow",
  "addSuggestion": api_prefix + "submitAddSuggestion",
  // "getSourceData": api_prefix + "getPyDq",
  "adhocExecutionTest": api_prefix + "adhocExecutionTest",
}


export const getDefinedRules = () => {
  return axios.get(apis.get);
}

export const submitRule = (rule) => {
  return axios.post(apis.submit, rule);
} 

export const getSourceMetadata = () => {
  return axios.get(apis.getSourceData);
}

export const editRule = (newRule) => {
  return axios.put(apis.edit, newRule)
} 

export const cloneRule = (ruleId) => {
  return axios.post(apis.clone, ruleId);
}

 export const deleteRule = (ruleId) => {
   return axios.post(apis.delete, ruleId);
 }

export const runNow = ruleAttributes => {
  return axios.post(apis.runNow, ruleAttributes)
}

export const addSuggestion = suggestionRuleData => {
  return axios.post(apis.addSuggestion, suggestionRuleData)
}

export const adhocExecutionTest = ruleAttributes => {
  return axios.post(apis.adhocExecutionTest, ruleAttributes)
}