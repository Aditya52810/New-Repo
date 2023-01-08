import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import LandingZoneHistory from './LandingZoneHistory';
import ExecSummaryService from '../../services/ExecSummaryService';

jest.mock('../../services/ExecSummaryService', () => jest.fn());
ExecSummaryService.getLandingZoneProfiles = jest.fn( function(){return Promise.resolve({})})

test('LandingZoneHistory Test to call getLandingZoneProfiles', async() => {

  render(<LandingZoneHistory />);
  expect(ExecSummaryService.getLandingZoneProfiles).toHaveBeenCalled();
});

test('LandingZoneHistory Test should render the Landing zone history properly', async() => {

  let comp = render(<LandingZoneHistory />);
  expect(await comp.findAllByText("Data Source Profilers")).toHaveLength(1)
});