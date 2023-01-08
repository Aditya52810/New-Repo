import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import DQSuggestion from './Suggestions';
import * as DQRAService from '../../services/DQRAService';
import DQSuggestionService from '../../services/DQSuggestionService';

jest.mock('../../services/DQRAService', () => jest.fn());
jest.mock('../../services/DQSuggestionService', () => jest.fn());
DQRAService.addSuggestion = jest.fn( function(){return Promise.resolve({})});
// DQRAService.getSourceMetadata = jest.fn(function(){return Promise.resolve(sampleSource)});
DQSuggestionService.getSuggestion = jest.fn(function(){return Promise.resolve({
  "data": [
    {
      "constraint_name": "ComplianceConstraint(Compliance('USRiskNationalExposureAmount' has no negative values,USRiskNationalExposureAmount >= 0,None))",
      "column_name": "USRiskNationalExposureAmount",
      "rule_description": "If we see only non-negative numbers in a column, we suggest a corresponding constraint",
      "code_for_constraint": ".isNonNegative(\"USRiskNationalExposureAmount\")",
      "source_system": "Positions",
      "constraint_description": "Negative check"
    },
    {
      "constraint_name": "ComplianceConstraint(Compliance('ListingUID' has no negative values,ListingUID >= 0,None))",
      "column_name": "ListingUID",
      "rule_description": "If we see only non-negative numbers in a column, we suggest a corresponding constraint",
      "code_for_constraint": ".isNonNegative(\"ListingUID\")",
      "source_system": "Positions",
      "constraint_description": "Negative check"
    },
    {
      "constraint_name": "ComplianceConstraint(Compliance('USMarketValueAmount' has no negative values,USMarketValueAmount >= 0,None))",
      "column_name": "USMarketValueAmount",
      "rule_description": "If we see only non-negative numbers in a column, we suggest a corresponding constraint",
      "code_for_constraint": ".isNonNegative(\"USMarketValueAmount\")",
      "source_system": "Positions",
      "constraint_description": "Negative check"
    }
  ]
})})

test('DQ Suggestion Test should call getSuggestion backend call', async() => {

  let comp = render(<DQSuggestion />);
  expect(DQSuggestionService.getSuggestion).toHaveBeenCalled();
  expect(DQRAService.addSuggestion).not.toHaveBeenCalled();
});

test('DQ Suggestion Test should render the component quality rules title properly', async() => {

  let comp = render(<DQSuggestion />);
  expect(await comp.findAllByText("Suggested Data Quality Rules")).toHaveLength(1)
});

test('DQ Suggestion Test should render the component quality rules list properly', async() => {

  let comp = render(<DQSuggestion />);
  expect(await comp.findAllByText("Data Entity (Table)")).toHaveLength(1)
  // expect(await comp.findByText('Positions')).toHaveLength(3)
  // expect(await comp.findByText('Add Suggestion')).toHaveLength(3)
});