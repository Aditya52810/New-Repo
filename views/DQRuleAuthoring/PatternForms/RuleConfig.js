import React from 'react'

import {
  FormInput,
  FormSelect,
  FormTextarea,
  Row,
  Col
} from "shards-react";


export const RuleConfig = ({ onChange, configData }) => {
	return (
		<>
      <Row className="text-bold text-header">
        <Col md={6} sm={6}>
          <div>DQ Pattern: {configData.RuleDefinition}</div>
        </Col>
      </Row>
      { configData.dqPattern === 'Negative check' || configData.dqPattern === 'Null check'|| configData.dqPattern.includes('Null') || configData.dqPattern === 'Uniqueness check' ? null :
      <Row className="mt-4">
        <Col sm={6} md={6}>
          <label>Constraint </label>
        </Col>
        <Col sm={6} md={6}>
          {
            configData.dqPattern.includes('Custom check') ?
            <FormTextarea
              placeholder="Please provide negative query e.g. Select * from listing where ListingUID <= 0 (Non negative check for ListingUID)" rows="2"
              name="constraints"
              autocomplete="off"
              value={configData.constraints}
              onChange={onChange}
            />
            :
            <FormInput type="text" 
              placeholder={ !configData.dqPattern.includes('Standard Deviation check') ? `(e.g. x < 369 , x == 5432, x > 78906)` : `(e.g. 3579, -7531)`}
              name="constraints"
              autocomplete="off"
              value={configData.constraints}
              onChange={onChange}
            />
          }
        </Col>
      </Row>
      }
      <Row className="mt-4">
        <Col sm={6} md={6}>
          <label>Criticality</label>
        </Col>
        <Col sm={6} md={6}>
          <FormSelect
            name="criticality"
            value={configData.criticality}
            onChange={onChange}
          >
            <option>Select From Options</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </FormSelect>
        </Col>
      </Row>     
    </>
	)
}

// export default StandardDeviation;
