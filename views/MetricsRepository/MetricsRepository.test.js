import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import MetricsRepository from './MetricsRepository';
import * as ExecSummaryService from '../../services/ExecSummaryService';

jest.mock('../../services/DQRAService', () => jest.fn());
ExecSummaryService.getExecSummaries = jest.fn( function(){return Promise.resolve({"data":[
  {
    "DQ_RuleId": "7",
    "check": "Constraint Check Data",
    "check_level": "Warning",
    "check_status": "Warning",
    "constraint": "CompletenessConstraint(Completeness(BaseCurrencyIdentifier,None))",
    "constraint_status": "Success",
    "constraint_message": "",
    "dq_user_constraint_message": null,
    "Execution_Date": "2022-06-14 12:48:30",
    "criticality": "Low",
    "Source_System": "portfolio"
  },
  {
    "DQ_RuleId": "1",
    "check": "Constraint Check Data",
    "check_level": "Warning",
    "check_status": "Warning",
    "constraint": "CompletenessConstraint(Completeness(PortfolioIdentifier,None))",
    "constraint_status": "Success",
    "dq_constraint_message": "",
    "dq_user_constraint_message": null,
    "Execution_Date": "2022-06-14 12:48:30",
    "criticality": "High",
    "Source_System": "portfolio"
  }
]})})

test('MetricsRepository Test to call getExecSummaries', async() => {

  render(<MetricsRepository />);
  expect(ExecSummaryService.getExecSummaries).toHaveBeenCalled();
});

test('MetricsRepository Test should render the Data Quality Metrics title properly', async() => {

  let comp = render(<MetricsRepository />);
  expect(await comp.findAllByText("Data Quality Metrics")).toHaveLength(1)
});

test('MetricsRepository Test should render the Data Quality Metrics list properly', async() => {

  let comp = render(<MetricsRepository />);
  expect(await comp.findAllByText("Data Entity (Table)")).toHaveLength(1)
  // expect(await comp.findByText('Positions')).toHaveLength(3)
  // expect(await comp.findByText('Add Suggestion')).toHaveLength(3)
});