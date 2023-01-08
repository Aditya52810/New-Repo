import React from 'react'

import {
  FormSelect,
  Row,
  Col,
} from "shards-react";

// required props
// pagedata.nonNegativePatternForm
// onChange


export const NonNegativePattern = props => {

  return (
    <>
      <Row className="text-bold text-header">
        <Col md={6} sm={6}>
          <div>DQ Pattern: {props.pageData.dqPattern}</div>
        </Col>
        <Col md={6} sm={6}>
          <div>Config</div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} sm={6}>
          <label>Data Source</label>
        </Col>
        <Col md={6} sm={6}>
          <FormSelect 
            placeholder="Select from options"
            name="dqRuleDataSourceType"
            value={props.pageData.nonNegativePatternForm.dqRuleDataSourceType}
            onChange={props.onChange("nonNegativePatternForm")}
          >
            <option>Select From Options</option>
            <option>File</option> {/* demo use case */}
            <option>Table</option> {/* demo use case */}
            {/*<option>Column</option> */}
          </FormSelect>
        </Col>
      </Row>

      {
        props.pageData.nonNegativePatternForm.dqRuleDataSource !== '' &&
        <Row className="mt-4">
          <Col md={6} sm={6}>
            <label>Enter {props.pageData.nonNegativePatternForm.dqRuleDataSource} name</label>
          </Col>
          <Col md={6} sm={6}>
            <FormSelect 
              type="text"
              name="dqRuleDataSourceName" 
              value={props.pageData.nonNegativePatternForm.dqRuleDataSourceName}
              placeholder="Source Name"
              onChange={props.onChange("nonNegativePatternForm")}
            >
              <option>Select From Options</option>
              <option>listing</option>
              <option>portfolio</option>
            </FormSelect>
          </Col>
        </Row>
       }

       { // TODO: MOVE TO OWN RULE - MATCHES_FORMAT (Note: data type match instead?)
         props.pageData.nonNegativePatternForm.dqPattern === 'MATCHES_FORMAT' &&
         <Row className="mt-4">
            <Col md={6} sm={6}>
              <label>Select Data Type</label>
            </Col>
            <Col md={6} sm={6}>
              <FormSelect placeholder="Select from options"
                name="dqRuleDataType"
                value={props.pageData.nonNegativePatternForm.dqRuleDataType}
                onChange={props.onChange("dqRuleDataType")}
              >
                <option value="">Select From Options</option>
                <option>Int</option>
                <option>Float</option>
                <option>String</option>
              </FormSelect>
            </Col>
          </Row>
        }

       <Row className="mt-4">
        <Col md={6} sm={6}>
          <label>Column Name</label>
        </Col>
        <Col md={6} sm={6}>
          <FormSelect
            type="text"
            name="dqRuleColumnname"
            value={props.pageData.nonNegativePatternForm.dqRuleColumnname} 
            placeholder="Enter Column name"
            onChange={props.onChange("nonNegativePatternForm")}
          >
            <option>Select From Options</option>
            <option>IssuerIdentifier</option>
            <option>InstrumentIdentifier</option>
          </FormSelect>
        </Col>
      </Row>
    </>
  )
}
