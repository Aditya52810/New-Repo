import React from 'react'


const StandardDeviation = props => {
	return (
		<>
      <Row className="text-bold text-header">
        <Col md={6} sm={6}>
          <div>DQ Pattern: {dqPattern}</div>
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
            value={stdDeviationPatternForm.LowerBoundWarning}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Error "
            name="LowerBoundError"
            autocomplete="off"
            value={stdDeviationPatternForm.LowerBoundError}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={6} md={6}>
          <label>Upper Bound</label>
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Warning"
            name="UpperBoundWarning"
            autocomplete="off"
            value={stdDeviationPatternForm.UpperBoundWarning}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Error"
            name="UpperBoundError"
            autocomplete="off"
            value={stdDeviationPatternForm.UpperBoundError}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
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
            value={stdDeviationPatternForm.BasedOnWarning}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="months"
            name="BasedOnError"
            autocomplete="off"
            value={stdDeviationPatternForm.BasedOnError}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
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
            value={stdDeviationPatternForm.MinDataPointWarning}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          />
        </Col>
        <Col sm={3} md={3}>
          <FormInput type="number" placeholder="Error"
            name="MinDataPointError"
            autocomplete="off"
            value={stdDeviationPatternForm.MinDataPointError}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
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
            value={stdDeviationPatternForm.RebalanceFrequencyWarning}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          >
            <option>Weekly</option>
            <option>Monthly</option>
          </FormSelect>
        </Col>
        <Col sm={3} md={3}>
          <FormSelect placeholder="Error"
            name="RebalanceFrequencyError"
            value={stdDeviationPatternForm.RebalanceFrequencyError}
            onChange={this.onChangePattern("stdDeviationPatternForm")}
          >
            <option>Weekly</option>
            <option>Monthly</option>
          </FormSelect>
        </Col>
      </Row>
    </>
	)
}

export default StandardDeviation;