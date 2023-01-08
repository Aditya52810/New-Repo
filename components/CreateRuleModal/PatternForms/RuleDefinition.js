import React from 'react'


const RuleDefinition = props => {
  const {
    RuleDefinition,
    dataSubjectArea,
    dataConcept,
  } = this.props;

  return (
    <>
      <Row>
        <Col md="12" className="form-group">
          <label htmlFor="ruleDefinition">Rule Description</label>
          <FormInput
            name="ruleDefinition"
            type="text"
            placeholder="Enter Rule Definition"
           
            autocomplete="off"
            value={RuleDefinition}
            onChange={this.onChange("RuleDefinition")}
          />
        </Col>
      </Row>

      <Row className="mt-2">
        {/* <Col md="6" className="form-group">
          <label htmlFor="dataSubjectArea">Data Subject Area</label>
          <FormSelect
            name="dataSubjectArea"
            placeholder="Select from options"
            value={this.state.dataSubjectArea}
            onChange={this.onChange("dataSubjectArea")}>
            <option>Select From Options</option>
            <option>Fund Performance</option>
            <option>Fund Accounting</option>
            <option>Transaction Position</option>
            <option>Security</option>
            <option>MarketData</option>
          </FormSelect>
        </Col> */}

        <Col md="6" className="form-group">
          <label htmlFor="dataConcept">Data Entity</label>
          <FormSelect
            placeholder="Select from options"
            name="dataConcept"
            value={this.state.dataConcept}
            onChange={this.onChange("dataConcept")}>
            <option>Select From Options</option>
            <option>ESG</option>
            <option>Portfolio Return</option>
            <option>Fund Asset</option>
            <option>Portfolio Position</option>
            <option>Portfolio Charecteristics</option>
            <option>Issuer</option>
          </FormSelect>
        </Col>

      </Row>

      <Row>
        <Col md="12" className="form-group">
          <label htmlFor="dataElement">Column Name</label>
          <FormInput
            name="dataElement"
            type="text"
            placeholder="Search"
            value={this.state.dataElement}
            onChange={this.onTextChanged}
          />
          <div className="justify-content-md-center">
            {this.renderSuggestions()}
          </div>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md="6" className="form-group">
          <label htmlFor="dqRuleType">DQ Rule Type</label>
          <FormSelect
            name="dqRuleType"
            value={this.state.dqRuleType}
            onChange={this.onChange("dqRuleType")}>
            <option>Semantic</option>
            <option>Syntactic</option>
          </FormSelect>
        </Col>

        <Col md="6" className="form-group">
          <label htmlFor="dqPattern">DQ Rule Pattern</label>
          <FormSelect
            name="dqPattern"
            value={dqPattern}
            onChange={this.onChange("dqPattern")}>
            {
              this.state.dqRuleType === 'Semantic' &&
              <>
                <option>Select From Options</option>
                <option>Standard Deviation</option>
                <option>Variance</option>
                <option>Custom</option>
              </>
            }

            {
              this.state.dqRuleType === 'Syntactic' &&
              <>
                /*props.rules.syntactic*/
                <option>Select From Options</option>
                <option>MATCHES_FORMAT</option>
                <option>MATCHES_REGEX</option>
                <option>Referential Integrity</option>
                <option>Null or Blank</option>
              </>
            }
          
          </FormSelect>
        </Col>

      </Row>

      <div className="divider-row"></div>

      <div className="d-flex justify-content-between mt-2">
        <button
          disabled={
            RuleDefinition.length === 0 || 
            Object.keys(editOriginal).length > 0
          }
          className="btn btn-info"
          onClick={this.clearForm}
        >
          Clear
        </button>
        <button
          // disabled={this.state.dqPattern.length === 0}
          className="btn btn-primary"
          onClick={this.stepperIncrement}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default RuleDefinition