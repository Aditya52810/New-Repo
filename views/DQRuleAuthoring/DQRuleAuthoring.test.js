import React from 'react';
import {render, fireEvent, waitFor, screen, shallow} from '@testing-library/react';
import DQRuleAuthoring from './DQRuleAuthoring';
import * as DQRAService from '../../services/DQRAService';

const sampleTestData = {
  data: [
    {
      ID: 28,
      //DQ_RuleId: "28",
      //Definition: "CUSTOM QUERY CHECK DEMO2",
      Rule_Description: "CUSTOM QUERY CHECK DEMO2",
      //Data_Subject: 'TransactionPosition',
      //Data_Concept: 'Positions',
     // Business_Term_Full_Name: 'TransactionPosition Positions',
      //DQ_Error_Message: '',
      //DQ_Threshold: '100%',
     // Dimension: 'Accuracy',
      Data_Entity: 'Positions',
      Criticality: 'Moderate',
     // Source_System: "portfolio",
      Column_Name: 'IssuerUID',
      Constraint: "select * from portfolio where ListingIdentifier>0",
     // DeequRule:
     //   "hascustomQuery('select * from portfolio where ListingIdentifier>0')",
      DQ_Rule_Type: 'Data at Rest (Semantic)',
      DQ_Rule_Pattern: "Custom check",
     // SchedulerConfig: {},
    },
  ],
};
const sampleSource = {
  data: {
    source_metadata: {
      CharacteristicRef: ["ListingUID", "IssuerUID", "InstrumentUID", "Issuer", "ListingIndustryClassification1", "ListingIndustryClassification2"],
              InstrumentRef: [
                "ListingUID",
                "IssuerUID",
                "InstrumentUID",
                "InstrumentType",
                // "marketvalue",
                "Instrument2",
                "InstrumentName",
                "OriginDate",
              ],
              ListingRef: [
                "ListingUID",
                "IssuerUID",
                "InstrumentUID",
                "Issuer",
                "ListingIndustryClassification1",
                "ListingIndustryClassification2",
                "CUSIP",
                "ListingLotSizeQuantity",
                "ListingBloombergID",
                "ListingTickerSymbol",
                
                // "ListingMarketIdentifier",
                // "IssuerIdentifier",
                // "InstrumentIdentifier",
              ],
              // portfolio: [
              //   "BaseCurrencyIdentifier",
              //   "basemarketvalueamount",
              //   "ListingIdentifier",
              //   "PositionShareCurrentFaceQuantity",
              //   "PortfolioIdentifier",
              //   "PositionDate",
              //   "USDMarketValueAmount",
              // ],
              Positions: [
                "PositionDate",
                "Portfolio",
                "ListingUID",
                "Listing",
                "Instrument",
                "Instrument2",
                "Issuer",
                "SharePrice",
                "LocalPrice",
                "LocalCurrency",
                "ShareQuantity",
                "USMarketValueAmount",
                "USRiskNationalExposureAmount",
                "ProcessCycleDate",
                "PositionMonth",
                "CUSIP",
      ],
    },
  },
};
const sampleSourceMetaData = {
  "data": {
      "source_metadata": {
        CharacteristicRef: ["ListingUID", "IssuerUID", "InstrumentUID", "Issuer", "ListingIndustryClassification1", "ListingIndustryClassification2"],
        InstrumentRef: [
          "ListingUID",
          "IssuerUID",
          "InstrumentUID",
          "InstrumentType",
          // "marketvalue",
          "Instrument2",
          "InstrumentName",
          "OriginDate",
        ],
        ListingRef: [
          "ListingUID",
          "IssuerUID",
          "InstrumentUID",
          "Issuer",
          "ListingIndustryClassification1",
          "ListingIndustryClassification2",
          "CUSIP",
          "ListingLotSizeQuantity",
          "ListingBloombergID",
          "ListingTickerSymbol",
          
          // "ListingMarketIdentifier",
          // "IssuerIdentifier",
          // "InstrumentIdentifier",
        ],
        // portfolio: [
        //   "BaseCurrencyIdentifier",
        //   "basemarketvalueamount",
        //   "ListingIdentifier",
        //   "PositionShareCurrentFaceQuantity",
        //   "PortfolioIdentifier",
        //   "PositionDate",
        //   "USDMarketValueAmount",
        // ],
        Positions: [
          "PositionDate",
          "Portfolio",
          "ListingUID",
          "Listing",
          "Instrument",
          "Instrument2",
          "Issuer",
          "SharePrice",
          "LocalPrice",
          "LocalCurrency",
          "ShareQuantity",
          "USMarketValueAmount",
          "USRiskNationalExposureAmount",
          "ProcessCycleDate",
          "PositionMonth",
          "CUSIP",
          ]
      }
  },
  "status": 200,
  "statusText": "OK"
}
jest.mock('../../services/DQRAService', () => jest.fn());
DQRAService.getDefinedRules = jest.fn( function(){return Promise.resolve(sampleTestData)})
DQRAService.getSourceMetadata = jest.fn(() => Promise.resolve(sampleSource))

test('DQRuleAuthoring Test', async() => {

  render(<DQRuleAuthoring />);
  expect(true).toBe(true);
});

test('DQRuleAuthoring Test to call getDefinedRules', async() => {

  render(<DQRuleAuthoring />);
  expect(DQRAService.getDefinedRules).toHaveBeenCalled();
});

test('DQRuleAuthoring Test should render the Data Quality Rule Catalog title properly', async() => {

  let comp = render(<DQRuleAuthoring />);
  expect(await comp.findAllByText("Data Quality Rule Catalog")).toHaveLength(1)
});

test('DQRuleAuthoring Test should render the Data Quality Rule Catalog list properly', async() => {

  let comp = render(<DQRuleAuthoring />);
  expect(await comp.findAllByText("Data Entity")).toHaveLength(1)
  // expect(await comp.findByText('Positions')).toHaveLength(3)
  // expect(await comp.findByText('Add Suggestion')).toHaveLength(3)
});