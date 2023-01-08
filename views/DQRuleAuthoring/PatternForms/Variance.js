import React from 'react'

import {
  FormSelect,
  Row,
  Col
} from "shards-react";


export const Variance = props => {
	return (
    <>
      <Row className="text-bold text-header">
        <Col md={4} sm={4}>
          <div>DQ Pattern: {props.pageData.dqPattern}</div>
        </Col>
        <Col md={4} sm={4}>
          <div>Warning</div>
        </Col>
        <Col md={4} sm={4}>
          <div>Error</div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm={4} md={4}>
          <label>Variance Type</label>
        </Col>
        <Col sm={4} md={4}>
          <FormSelect placeholder="Type"
            name="VarianceTypeWarning"
            value={props.pageData.variancePatternForm.VarianceTypeWarning}
            onChange={props.onChange("variancePatternForm")}
          >
            <option>Month over Month</option>
            <option>Over recent data point</option>
            <option>Average</option>
            <option>Fixed Value</option>
          </FormSelect>
        </Col>
        <Col sm={4} md={4}>
          <FormSelect placeholder="Type"
            name="VarianceTypeError"
            value={props.pageData.variancePatternForm.VarianceTypeError}
            onChange={props.onChange("variancePatternForm")}
          >
            <option>Month over Month</option>
            <option>Over recent data point</option>
            <option>Average</option>
            <option>Fixed Value</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={4} md={4}>
          <label>Outlier Range %</label>
        </Col>
        <Col sm={4} md={4}>
          <FormSelect placeholder="Select range"
            name="OutlierRangeWarning"
            value={props.pageData.variancePatternForm.OutlierRangeWarning}
            onChange={props.onChange("variancePatternForm")}
          >
            <option>0%</option>
            <option>-5%</option>
            <option>+5%</option>
          </FormSelect>
        </Col>
        <Col sm={4} md={4}>
          <FormSelect placeholder="Select range"
            name="OutlierRangeError"
            value={props.pageData.variancePatternForm.OutlierRangeError}
            onChange={props.onChange("variancePatternForm")}
          >
            <option>0%</option>
            <option>-10%</option>
            <option>+10%</option>
          </FormSelect>
        </Col>
      </Row>
    </>
	)
}

// export default Variance;