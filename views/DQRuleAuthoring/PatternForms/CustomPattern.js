import React from 'react'

import {
  FormTextarea,
  Row,
  Col
} from "shards-react";


export const CustomPattern = props => {
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
      {/*<Row className="mt-4">
        <Col sm={4} md={4}>
          <label>Custom Rule</label>
        </Col>
        <Col sm={4}>
          <FormInput type="text" placeholder="Rule"
            name="CustomRuleWarning"
            value={props.pageData.customPatternForm.CustomRuleWarning}
            onChange={props.onChange("customPatternForm")}
          />
        </Col>
        <Col sm={4} md={4}>
          <FormInput type="text" placeholder="Rule"
            name="CustomRuleError"
            autocomplete="off"
            value={props.pageData.customPatternForm.CustomRuleError}
            onChange={props.onChange("customPatternForm")}
          />
        </Col>
      </Row>*/}
      <Row className="mt-2">
        <Col sm={4} md={4}>
          <label>SQL Code</label>
        </Col>
        <Col sm={4} md={4}>
          <FormTextarea
            placeholder="Enter SQL Code" rows="5"
            name="CustomSQLCodeWarning"
            autocomplete="off"
            value={props.pageData.customPatternForm.CustomSQLCodeWarning}
            onChange={props.onChange("customPatternForm")}
          />
        </Col>
        <Col sm={4} md={4}>
          <FormTextarea placeholder="Enter SQL Code" rows="5"
            name="CustomSQLCodeError"
            autocomplete="off"
            value={props.pageData.customPatternForm.CustomSQLCodeError}
            onChange={props.onChange("customPatternForm")}
          />
        </Col>
      </Row>
    </>
	)
}

// export default CustomPattern;