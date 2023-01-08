import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import DQFindings from './DQFindings';
import Services from '../../services';

jest.mock('../../services', () => jest.fn());
Services.dqfind = jest.fn( function(){return Promise.resolve({})})

test('DQFindings Test to call dfind', async() => {

  render(<DQFindings />);
  expect(Services.dqfind).toHaveBeenCalled();
});