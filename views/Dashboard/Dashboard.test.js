import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import Dashboard from './Dashboard';
import Services from '../../services';

jest.mock('../../services', () => jest.fn());
Services.healthTrend = jest.fn( function(){return Promise.resolve({"data":{
  "data": [
    {
      "Execution_Date": "2022-01-19 12:50:57",
      "success": 14,
      "total": 18
    },
  ]
}})})
Services.score = jest.fn(function(){return Promise.resolve({
  "avgscorepastmonth": 61.72688792688792,
  "avgscorepastweek": 67.85714285714286,
  "avgscoretoday": 75
})})

test('Dashboard Test to call healthTrend, score', async() => {

  render(<Dashboard />);
  expect(Services.healthTrend).toHaveBeenCalled();
  expect(Services.score).toHaveBeenCalled();
});

test('Dashboard Test should render the Aggregated Data Quality Score properly', async() => {

  let comp = render(<Dashboard />);
  expect(await comp.findAllByText("Aggregated Data Quality Score")).toHaveLength(1)
});

test('Dashboard Test should render the Data Quality Metrics properly', async() => {

  let comp = render(<Dashboard />);
  expect(await comp.findAllByText("Data Quality Metrics")).toHaveLength(1)
});