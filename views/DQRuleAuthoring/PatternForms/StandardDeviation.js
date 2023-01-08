import React from 'react'

import {
  FormInput,
  Row,
  Col
} from "shards-react";


export const StandardDeviation = props => {
	return (
		<>
      <Row className="text-bold text-header">
        <Col md={6} sm={6}>
          <div>DQ Pattern: {props.pageData.dqPattern}</div>
        </Col>
        <Col md={3} sm={3}>
          <div>Warning</div>
        </Col>
        <Col md={3} sm={3}>
          <div>Error</div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm={6} md={6}>
          <label>Lower Bound</label>
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Warning"
            name="LowerBoundWarning"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.LowerBoundWarning}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Error "
            name="LowerBoundError"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.LowerBoundError}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
      </Row>
      {/*<Row className="mt-2">
        <Col sm={6} md={6}>
          <label>Upper Bound</label>
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Warning"
            name="UpperBoundWarning"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.UpperBoundWarning}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Error"
            name="UpperBoundError"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.UpperBoundError}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={6} md={6}>
          <label>Based On (months)</label>
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="months"
            name="BasedOnWarning"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.BasedOnWarning}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="months"
            name="BasedOnError"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.BasedOnError}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={6} md={6}>
          <label>Min Data Points</label>
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Warning"
            name="MinDataPointWarning"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.MinDataPointWarning}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Error"
            name="MinDataPointError"
            autocomplete="off"
            value={props.pageData.stdDeviationPatternForm.MinDataPointError}
            onChange={props.onChange("stdDeviationPatternForm")}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={6} md={6}>
          <label>Rebalance Frequency</label>
        </Col>
        <Col sm={3} md={3}>
          <FormSelect as="select" placeholder="Warning"
            name="RebalanceFrequencyWarning"
            value={props.pageData.stdDeviationPatternForm.RebalanceFrequencyWarning}
            onChange={props.onChange("stdDeviationPatternForm")}
          >
            <option>Weekly</option>
            <option>Monthly</option>
          </FormSelect>
        </Col>
        <Col sm={3} md={3}>
          <FormSelect placeholder="Error"
            name="RebalanceFrequencyError"
            value={props.pageData.stdDeviationPatternForm.RebalanceFrequencyError}
            onChange={props.onChange("stdDeviationPatternForm")}
          >
            <option>Weekly</option>
            <option>Monthly</option>
          </FormSelect>
        </Col>
      </Row>*/}
    </>
	)
}

// export default StandardDeviation;