import  mockAxios from "axios";
import {getDefinedRules,getSourceMetadata} from "../DQRAService";

describe("test services",()=>{
  beforeEach(() => {    
    jest.mock('axios', () => jest.fn());
  })
    it("getDefinedRules",async ()=>{
      const sampleTestData = {
        data: [
          {
            ID: 31,
            //DQ_RuleId: "28",
           // Definition: "CUSTOM QUERY CHECK DEMO2",
            Rule_Description: "CUSTOM QUERY CHECK DEMO2",
           // Data_Subject: null,
            //Data_Concept: null,
            Data_Entity: null,
            //Business_Term_Full_Name: null,
            // DQ_Error_Message: null,
            // DQ_Threshold: null,
            // Dimension: null,
            Criticality: null,
            //Source_System: "portfolio",
            Constraint: null,
            Column_Name: null,
            // DeequRule:
            //   "hascustomQuery('select * from portfolio where ListingIdentifier>0')",
            DQ_Rule_Type: null,
            DQ_Rule_Pattern: "Custom check",
            //SchedulerConfig: null,
          },
        ],
      };
    mockAxios.get = jest.fn(() => Promise.resolve(sampleTestData))
        
        const data = await getDefinedRules();
        expect(data).toEqual(sampleTestData)
    })

    it("getSourceMetadata",async ()=>{
        const sampleTestData = {
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
        mockAxios.get = jest.fn(() => Promise.resolve(sampleTestData))

        const data = await getSourceMetadata();
        expect(data).toEqual(sampleTestData)
    })
})