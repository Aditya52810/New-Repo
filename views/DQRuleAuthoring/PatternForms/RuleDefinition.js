// import React from 'react'

// import {
//   FormInput,
//   FormSelect,
//   Row,
//   Col,
// } from "shards-react";

// // import { 
// //   getSourceMetadata,
// // } from '../../../services/DQRAService';

// // const semanticRules = [
// //   'Null or Blank',
// //   'Non Negative',
// //   'Standard Deviation',
// //   // 'Variance',
// //   'Threshold Maximum',
// //   'Threshold Minimum',
// //   // 'Referential Integrity'
// // ]

// // const syntacticRules = [
// //   'Uniqueness'
// // ]

// // const semanticKey = 'Data at Rest (Semantic)'
// // const syntacticKey = 'Data in Motion (Syntactic)'

// export const RuleDefinitionPage = props => {

//   // const uniqueDSA = ["Please Select...", ...Array.from(new Set( props.pageData.dataSubjectConceptElement.map( d => d.subjectArea)))]
//   // const uniqueDC = ["Please Select...", ...Array.from(new Set(props.pageData.dataSubjectConceptElement.filter( d => d.subjectArea === props.pageData.dataSubjectArea))).map( d => d.dataConcept )]
//   // const uniqueDE = ["Please Select...", ...Array.from(new Set(props.pageData.dataSubjectConceptElement.filter( d => d.subjectArea === props.pageData.dataSubjectArea && d.dataConcept === props.pageData.dataConcept))).map( d => d.dataElement )]

//   // const [dataSubjectConceptElement, setMetadata] = useState([])
//   // const [dqFunctions, setDQFunctions] = useState([])

//   const {
//     metadataFields: dataSubjectConceptElement,
//     dqFunctions
//   } = props.pageData;
import React from 'react'

import {
  FormInput,
  FormSelect,
  Row,
  Col,
} from "shards-react";

// import { 
//   getSourceMetadata,
// } from '../../../services/DQRAService';

// const semanticRules = [
//   'Null or Blank',
//   'Non Negative',
//   'Standard Deviation',
//   // 'Variance',
//   'Threshold Maximum',
//   'Threshold Minimum',
//   // 'Referential Integrity'
// ]

// const syntacticRules = [
//   'Uniqueness'
// ]

// const semanticKey = 'Data at Rest (Semantic)'
// const syntacticKey = 'Data in Motion (Syntactic)'

export const RuleDefinitionPage = props => {

  // const uniqueDSA = ["Please Select...", ...Array.from(new Set( props.pageData.dataSubjectConceptElement.map( d => d.subjectArea)))]
  // const uniqueDC = ["Please Select...", ...Array.from(new Set(props.pageData.dataSubjectConceptElement.filter( d => d.subjectArea === props.pageData.dataSubjectArea))).map( d => d.dataConcept )]
  // const uniqueDE = ["Please Select...", ...Array.from(new Set(props.pageData.dataSubjectConceptElement.filter( d => d.subjectArea === props.pageData.dataSubjectArea && d.dataConcept === props.pageData.dataConcept))).map( d => d.dataElement )]

  // const [dataSubjectConceptElement, setMetadata] = useState([])
  // const [dqFunctions, setDQFunctions] = useState([])

  const {
    metadataFields: dataSubjectConceptElement, 
    dqFunctions
  } = props.pageData;

  // console.log(props.pageData)

  const uniqueDSA = ["Please Select...", 'Transaction Position', 'Investment Account', 'Security', 'Suggestions']
  const uniqueDC = ["Please Select...", ...Object.keys(dataSubjectConceptElement)]

  let uniqueDE = ["Please Select..."]

  if (dataSubjectConceptElement[props.pageData.dataConcept] !== undefined) {
    uniqueDE = [...uniqueDE, ...dataSubjectConceptElement[props.pageData.dataConcept]]
  }

  // const dqPatterns = props.pageData.dqRuleType === semanticKey 
  //   ? semanticRules
  //   : props.pageData.dqRuleType === syntacticKey 
  //     ? syntacticRules
  //     : ['Please select a DQ Rule Type']

  return (
    <>
      <Row>
        <Col md="12" className="form-group">
          <label htmlFor="ruleDefinition">Rule Description</label>
          <FormInput
            name="ruleDefinition"
            type="text"
            placeholder="Enter Rule Description"
            autocomplete="off"
            value={props.pageData.ruleDefinition}
            onChange={props.onChange}
          />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md="6" className="form-group">
          <label htmlFor="dqRuleType">DQ Rule Type</label>
          <FormSelect
            name="dqRuleType"
            value={props.pageData.dqRuleType}
            onChange={props.onChange}
          >
            <option>Select From Options</option>
            <option>Data at Rest (Semantic)</option>
            <option>Data in Motion (Syntactic)</option>
          </FormSelect>
        </Col>

        <Col md="6" className="form-group">
          <label htmlFor="dqPattern">DQ Rule Pattern</label>
          <FormSelect
            name="dqPattern"
            value={props.pageData.dqPattern}
            onChange={props.onChange}
            disabled={props.pageData.dqRuleType.length === 0}
          >
            <option>{ props.pageData.dqRuleType === 'Semantic' || props.pageData.dqRuleType === 'Syntactic' ? "Please select a DQ Rule Pattern" : "Please select a DQ Rule Type" }</option>
            { dqFunctions?.map( pattern => <option selected={props.pageData.dqPattern === pattern.BusinessFunctionName} value={pattern.BusinessFunctionName}>{pattern.BusinessFunctionName}</option> ) }
          </FormSelect>
        </Col>
      </Row>

      <Row className="mt-2">
        {/* <Col md="6" className="form-group">
          <label htmlFor="dataSubjectArea">Data Subject Area</label>
          <FormSelect
            name="dataSubjectArea"
            placeholder="Select from options"
            value={props.pageData.dataSubjectArea}
            onChange={props.onChange}
            disabled={props.pageData.dqPattern.length === 0}
          >
            {
              uniqueDSA.map( d => <option>{d}</option>)
            }
          </FormSelect>
        </Col> */}

        <Col md="6" className="form-group">
          <label htmlFor="dataConcept">Data Entity</label>
          <FormSelect
            placeholder="Select from options"
            name="dataConcept"
            value={props.pageData.dataConcept}
            onChange={props.onChange}
            disabled={props.pageData.dqPattern.length === 0}
          >
            {/* <option>Select New</option>
            <option>Positions</option>
            <option>ListingRef</option>
            <option>IssuerRef</option>
            <option>InstrumentRef</option>
            <option>CharateristicsRef</option> */}
            {
              uniqueDC.map( d => <option>{d}</option> )
            }
          </FormSelect>
        </Col>

      </Row>

      <Row>
        <Col md="12" className="form-group">
          <label htmlFor="dataElement">Column Name</label>
          <FormSelect
            name="dataElement"
            placeholder="Select From Options"
            value={props.pageData.dataElement}
            onChange={props.onChange}
            disabled={props.pageData.dataConcept.length === 0}
          >
            {
              uniqueDE.map( d => <option>{d}</option> )
            }
          </FormSelect>
        </Col>
      </Row>
    </>
  )
}

// export default RuleDefinition
