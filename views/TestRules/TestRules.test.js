import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import TestRules from './TestRules';
import ExecSummaryService from '../../services/ExecSummaryService';

jest.mock('../../services/ExecSummaryService', () => jest.fn());
ExecSummaryService.getRuleTestSummaries = jest.fn(function(){return Promise.resolve({
  "data": [
    {
      "Entity_Name": "portfolio",
      "Data_Element": null,
      "Rule_Id": "27",
      "Execution_Date": "2022-06-16T09:44:41.000Z",
      "Execution_Status": "PROCESSED",
      "Req_id": 1083
    },
  ],
  "summaries": [
    {
      "DQ_RuleId": "28",
      "check": " ",
      "check_level": " ",
      "check_status": " ",
      "constraint": " ",
      "constraint_status": "DQ Findings",
      "dq_constraint_message": " ",
      "dq_user_constraint_message": " ",
      "Execution_Date": "2022-06-16 09:44:33",
      "criticality": " ",
      "Source_System": "portfolio",
      "master_rule_datum.id": 28,
      "master_rule_datum.DQ_RuleId": "28",
      "master_rule_datum.Definition": "CUSTOM QUERY CHECK DEMO2",
      "master_rule_datum.Data_Subject": null,
      "master_rule_datum.Data_Concept": null,
      "master_rule_datum.Business_Term_Full_Name": null,
      "master_rule_datum.DQ_Error_Message": null,
      "master_rule_datum.DQ_Threshold": null,
      "master_rule_datum.Dimension": null,
      "master_rule_datum.Criticality": null,
      "master_rule_datum.Source_System": "portfolio",
      "master_rule_datum.Column_Name": null,
      "master_rule_datum.DeequRule": "hascustomQuery('select * from portfolio where ListingIdentifier>0')",
      "master_rule_datum.SchedulerConfig": null,
      "master_rule_datum.DQ_Rule_Type": null,
      "master_rule_datum.DQ_Rule_Pattern": "Custom check",
      "master_rule_datum.dq_function_id": null
    },
  ]
})})

test('TestRules Test should call getRuleTestSummaries backend call', async() => {

  let comp = render(<TestRules />);
  expect(ExecSummaryService.getRuleTestSummaries).toHaveBeenCalled();
});

test('TestRules Test should render the component Rule Execution titles properly', async() => {

  let comp = render(<TestRules />);
  expect(await comp.findAllByText("Rule Execution Progress")).toHaveLength(1)
  expect(await comp.findAllByText("Rule Execution Results")).toHaveLength(1)
});

test('TestRules Test should render the component Rule Execution lists properly', async() => {

  let comp = render(<TestRules />);
  expect(await comp.findAllByText("Data Entity (Table)")).toHaveLength(1)
  expect(await comp.findAllByText("Data Entity (Entity)")).toHaveLength(1)
  // expect(await comp.findByText('Positions')).toHaveLength(3)
  // expect(await comp.findByText('Add Suggestion')).toHaveLength(3)
});