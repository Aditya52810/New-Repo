import React from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
} from "shards-react";

const ProgressBar = props => 
  <div className="stepper-progress">
    <Progress value={props.step === 2 ? 50 : props.step > 2 ? 100 : 0} />
  </div>

const defaultPage = ``;



class BaseModal extends React.Component {
	constructor(props) {
		super(props)

    this.state = {
      RuleDefinition: '',
      dataElement: '',
      dataSubjectArea: '',
      dataConcept: '',
      dqRuleType: 'Semantic',
      dqPattern: '',
      stdDeviationPatternForm: {
        LowerBoundWarning: null,
        UpperBoundWarning: null,
        LowerBoundError: null,
        UpperBoundError: null,
        BasedOnWarning: null,
        BasedOnError: null,
        MinDataPointWarning: null,
        MinDataPointError: null,
        RebalanceFrequencyWarning: 'Weekly',
        RebalanceFrequencyError: 'Weekly',
      },
      variancePatternForm: {
        VarianceTypeWarning: 'Month over Month',
        VarianceTypeError: 'Month over Month',
        OutlierRangeWarning: 0,
        OutlierRangeError: 0,
       // FixedValueWarning: 0,
       // FixedValueError: 0
      },
      customPatternForm: {
        CustomRuleWarning: '',
        CustomRuleError: '',
        CustomSQLCodeWarning: '',
        CustomSQLCodeError: ''
      },

      dqRuleSchedule: '',
      dqRuleFrequency: '',
      dailyDayFrequency: 1,
      dqRuleExecutionStartTime: '',
      weeklyFrequencyDays: [],
      newDataSQLCode: '',

      dqRuleDataSource : '',
      dqRuleDataField : '',
      dqRuleDataType: '',
      dqRuleCriteria: '',

      RuleException: '',
      delete: false,
      edit: false,
      suggestions: [],
      dataElement: '',
      showStepper: false,
      step: 1,
     
      
      dailyOrWeekly: '',
      daily: '',
      weekly: '',

    }
	}

  render() {
    const dat = this.props

    return(
      <Modal 
        open={this.props.showStepper} 
        toggle={this.toggle} 
        className="dqra-rule-popup"
        backdropClassName="blur-modal-backdrop" 
        size="md" 
        keyboard={false}
      >
          <ModalHeader className="p-3">
            <Row>
              <Col md={11} sm={11}>
                <div className="modal-title"> DQ Rule Authoring </div>
              </Col>
              <Col md={1} sm={1} onClick={this.toggle}>
                <span className="modal-close"><i className="fas fa-times"></i></span>
              </Col>
            </Row>
          </ModalHeader>

          <ModalBody className="p-3">
            <div className="d-flex justify-content-between">
              <div className={`stepper-step-icon-new d-flex justify-content-center ${step === 1 ? "stepper-step-icon-active" : step > 1 ? "stepper-step-icon-complete" : "stepper-step-icon-inactive"}`}>
                {step > 1 &&
                  <i className="fas fa-check-circle"></i>
                }
                {step === 1 &&
                  <i className="fas fa-lock-open"></i>
                }
              </div>
              <div className="stepper-progress">
                <Progress className={step > 1 ? 'step-complete' : 'step-pending'} value={step === 1 ? 50 : step > 1 ? 100 : 0} />
              </div>
              <div className={`stepper-step-icon-new d-flex justify-content-center ${step == 2 ? "stepper-step-icon-active" : step > 2 ? "stepper-step-icon-complete" : "stepper-step-icon-inactive"}`}>
                {step > 2 &&
                  <i className="fas fa-check-circle"></i>
                }
                {step === 2 &&
                  <i className="fas fa-lock-open"></i>
                }
                {
                  step < 2 &&
                  <i className="fas fa-lock"></i>
                }
              </div>

              <ProgressBar step={dat.step} />

              <div className="stepper-progress">
                <Progress value={step === 2 ? 50 : step > 2 ? 100 : 0} />
              </div>
              <div className={`stepper-step-icon-new d-flex justify-content-center ${step == 3 ? "stepper-step-icon-active" : "stepper-step-icon-inactive"}`}>
                {step > 3 &&
                  <i className="fas fa-check-circle"></i>
                }
                {step === 3 &&
                  <i className="fas fa-lock-open"></i>
                }
                {
                  step < 3 &&
                  <i className="fas fa-lock"></i>
                }
              </div>
            </div>

            <div className="d-flex justify-content-between stepper-step mt-1 mb-2">
              <div>Rule<br />Definition</div>
              <div>Rule<br />Pattern</div>
              <div>Scheduler</div>
            </div>

            <div className="divider-row"></div>

            <Form className="mt-3 rule-builder-form">
              {step === 1 &&
                <RuleDefinition />
              }
              {step === 2 &&
                <>
                  {dqPattern === "Standard Deviation" &&
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
                  }

                  {dqPattern === "Variance" &&
                    <>
                      <Row className="text-bold text-header">
                        <Col md={4} sm={4}>
                          <div>DQ Pattern: {dqPattern}</div>
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
                            value={variancePatternForm.VarianceTypeWarning}
                            onChange={this.onChangePattern("variancePatternForm")}
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
                            value={variancePatternForm.VarianceTypeError}
                            onChange={this.onChangePattern("variancePatternForm")}
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
                            value={variancePatternForm.OutlierRangeWarning}
                            onChange={this.onChangePattern("variancePatternForm")}
                          >
                            <option>0%</option>
                            <option>-5%</option>
                            <option>+5%</option>
                          </FormSelect>
                        </Col>
                        <Col sm={4} md={4}>
                          <FormSelect placeholder="Select range"
                            name="OutlierRangeError"
                            value={variancePatternForm.OutlierRangeError}
                            onChange={this.onChangePattern("variancePatternForm")}
                          >
                            <option>0%</option>
                            <option>-10%</option>
                            <option>+10%</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      {/* <Row className="mt-2">
                        <Col sm={4} md={4}>
                          <label>Fixed Value</label>
                        </Col>
                        <Col sm={4} md={4}>
                          <FormInput type="number" placeholder="Warning"
                            name="FixedValueWarning"
                            value={variancePatternForm.FixedValueWarning}
                            onChange={this.onChangePattern("variancePatternForm")}
                          />
                        </Col>
                        <Col sm={4} md={4}>
                          <FormInput type="number" placeholder="Error"
                            name="FixedValueError"
                            autocomplete="off"
                            value={variancePatternForm.FixedValueError}
                            onChange={this.onChangePattern("variancePatternForm")}
                          />
                        </Col>
                      </Row> */}

                    </>
                  }


                  {dqPattern === "Custom" &&
                    <>
                      <Row className="text-bold text-header">
                        <Col md={4} sm={4}>
                          <div>DQ Pattern: {dqPattern}</div>
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
                          <label>Custom Rule</label>
                        </Col>
                        <Col sm={4} md={4}>
                          <FormInput type="text" placeholder="Rule"
                            name="CustomRuleWarning"
                            value={customPatternForm.CustomRuleWarning}
                            onChange={this.onChangePattern("customPatternForm")}
                          />
                        </Col>
                        <Col sm={4} md={4}>
                          <FormInput type="text" placeholder="Rule"
                            name="CustomRuleError"
                            autocomplete="off"
                            value={customPatternForm.CustomRuleError}
                            onChange={this.onChangePattern("customPatternForm")}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col sm={4} md={4}>
                          <label>SQL Code</label>
                        </Col>
                        <Col sm={4} md={4}>
                          <FormTextarea placeholder="Rule"
                            placeholder="Enter SQL Code" rows="5"
                            name="CustomSQLCodeWarning"
                            autocomplete="off"
                            value={customPatternForm.CustomSQLCodeWarning}
                            onChange={this.onChangePattern("customPatternForm")}
                          />
                        </Col>
                        <Col sm={4} md={4}>
                          <FormTextarea placeholder="Enter SQL Code" rows="5"
                            name="CustomSQLCodeError"
                            autocomplete="off"
                            value={customPatternForm.CustomSQLCodeError}
                            onChange={this.onChangePattern("customPatternForm")}
                          />
                        </Col>
                      </Row>
                    </>
                  }

                  {
                    this.state.dqRuleType === "Syntactic" &&
                    <>
                      <Row className="text-bold text-header">
                        <Col md={6} sm={6}>
                          <div>DQ Pattern: {dqPattern}</div>
                        </Col>
                        <Col md={6} sm={6}>
                          <div>Error</div>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                      <Col md={6} sm={6}>
                        <label>Data Source</label>
                      </Col>
                      <Col md={6} sm={6}>
                      <FormSelect placeholder="Select from options"
                        name="dqRuleDataSource"
                        value={dqRuleDataSource}
                        onChange={this.onChange("dqRuleDataSource")}
                      >
                        <option value="">Select From Options</option>
                        <option>File</option>
                        <option>Table</option>
                        <option>Column</option>
                      </FormSelect>
                      </Col>
                      </Row>
                      {
                        this.state.dqRuleDataSource !== '' &&
                        <Row className="mt-4">
                        <Col md={6} sm={6}>
                          <label>Enter {this.state.dqRuleDataSource} name</label>
                        </Col>
                        <Col md={6} sm={6}>
                          <FormInput type="text" value={dqRuleDataField} placeholder="Enter name"
                          onChange={this.onChange("dqRuleDataField")}></FormInput>
                        </Col>
                        </Row>
                       }
                       {
                         dqPattern === 'MATCHES_FORMAT' &&
                         <Row className="mt-4">
                        <Col md={6} sm={6}>
                          <label>Select Data Type</label>
                        </Col>
                        <Col md={6} sm={6}>
                          <FormSelect placeholder="Select from options"
                        name="dqRuleDataType"
                        value={dqRuleDataType}
                        onChange={this.onChange("dqRuleDataType")}
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
                          <label>Criteria</label>
                        </Col>
                        <Col md={6} sm={6}>
                          <FormInput type="text" value={dqRuleCriteria} placeholder="Enter Criteria"
                          onChange={this.onChange("dqRuleCriteria")}></FormInput>
                        </Col>
                        </Row>

                      </>
                  }

                  {/* {
                    dqPattern === "MATCHES_REGEX" &&
                    <>
                      <Row className="text-bold text-header">
                        <Col md={6} sm={6}>
                          <div>DQ Pattern: {dqPattern}</div>
                        </Col>
                        <Col md={6} sm={6}>
                          <div>Error</div>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                      </Row>
                      </>
                  }

                  {
                    dqPattern === "Referential Integrity" &&
                    <>
                      <Row className="text-bold text-header">
                        <Col md={6} sm={6}>
                          <div>DQ Pattern: {dqPattern}</div>
                        </Col>
                        <Col md={6} sm={6}>
                          <div>Error</div>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                      </Row>
                      </>
                  } */}

                  <div className="divider-row mt-2"></div>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-secondary"
                      onClick={this.stepperDecrement}
                    >Back</button>
                    <button
                      className="btn btn-primary ml-2"
                      onClick={this.stepperIncrement}
                    >Next</button>
                  </div>
                </>
              }
              {this.state.step == 3 &&
                <>
                  <Row className="mt-2">
                    <Col md={12} sm={12}>
                      <label>Schedule</label>
                    </Col>
                    <Col md={12} sm={12}>
                      <FormSelect placeholder="Select from options"
                        name="dqRuleSchedule"
                        value={dqRuleSchedule}
                        onChange={this.onChange("dqRuleSchedule")}
                        disabled={this.state.newDataSQLCode !== ''}
                      >
                        <option value="">Select From Options</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                      </FormSelect>
                    </Col>
                  </Row>

                  {
                    this.state.dqRuleSchedule === 'Daily' &&
                    <>
                      <Row className="mt-2">
                        <Col md={4} sm={4}>
                          <label>Frequency</label>
                        </Col>
                        <Col md={4} sm={4}>
                          <input type="radio"
                            name="dqRuleFrequency"
                            onChange={this.setdqRuleFrequency("dqRuleFrequency")}
                          
                            value={`Every ${this.state.dailyDayFrequency} ${this.state.dailyDayFrequency > 1 ? 'Days' : 'Day'}`}
                          />
                          <label style={{ 'marginLeft': '8px' }}> Every 
                          <input style={{ 'display': 'inline-block', 'maxWidth': '40px' }} type="number" size="sm" placeholder="1"
                            onChange={this.onChange("dailyDayFrequency")}
                          />
                          &nbsp; Day(s)</label>
                        </Col>
                        <Col md={4} sm={4}>
                          <input type="radio"
                            name="dqRuleFrequency"
                            onChange={this.setdqRuleFrequency("dqRuleFrequency")}
                            value="Every Weekday"
                          />
                          <label style={{ 'marginLeft': '5px' }}>Every weekday</label>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col md={4} sm={4}>
                          <label>Start Time</label>
                        </Col>
                        <Col md={8} sm={8}>
                            <FormInput type="time"
                            name="dqRuleExecutionStartTime"
                            onChange={this.setdqRuleFrequency("dqRuleExecutionStartTime")}></FormInput>
                        </Col>
                      </Row>
                    </>
                  }


                  {
                    this.state.dqRuleSchedule === 'Weekly' &&
                    <>
                    <Row className="mt-2">
                      <Col md={4} sm={4}>
                        <label>Frequency</label>
                      </Col>
                      <Col md={8} sm={8}>
                       <label>Recur every <input style={{ 'display': 'inline-block', 'maxWidth': '40px' }} type="number" size="sm" placeholder="1" name="dailyDayFrequency"
                       onChange={this.onChange("dailyDayFrequency")}
                       /> week(s) on: 
                       </label>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4} sm={4}>
                        &nbsp;
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Sunday" className="mr-2"
                      onClick={this.setWeeklyFrequency()} />
                      <br/>
                      <label>Sunday</label>
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Monday" className="mr-2" 
                        onClick={this.setWeeklyFrequency()}
                      />
                      <br/>
                      <label>Monday</label>
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Tuesday" className="mr-2" 
                        onClick={this.setWeeklyFrequency()}
                      />
                      <br/>
                      <label>Tuesday</label>
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Wednesday" className="mr-2"
                      onClick={this.setWeeklyFrequency()} />
                      <br/>
                      <label>Wednesday</label>
                      </Col>
                     
                    </Row>

                    <Row>
                      <Col md={4} sm={4}>
                        &nbsp;
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Thursday" className="mr-2"
                      onClick={this.setWeeklyFrequency()} />
                      <br/>
                      <label>Thursday</label>
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Friday" className="mr-2"
                      onClick={this.setWeeklyFrequency()} />
                      <br/>
                      <label>Friday</label>
                      </Col>
                      <Col md={2} sm={2}>
                      <input type="checkbox" value="Saturday" className="mr-2"
                      onClick={this.setWeeklyFrequency()} />
                      <br/>
                      <label>Saturday</label>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col md={4} sm={4}>
                        <label>Start Time</label>
                      </Col>
                      <Col md={8} sm={8}>
                          <FormInput type="time"
                          name="dqRuleExecutionStartTime"
                          onChange={this.setdqRuleFrequency("dqRuleExecutionStartTime")}></FormInput>
                      </Col>
                    </Row>

                    </>
                  }


                  <Row className="mt-2">
                    <Col md={12} sm={12}>
                      <label>New Data Load</label>
                    </Col>
                    <Col md={12} sm={12}>
                      <FormTextarea
                        placeholder="Select table..." rows="2"
                        name="newDataSQLCode"
                        autocomplete="off"
                        value={newDataSQLCode}
                        onChange={this.onChange("newDataSQLCode")}
                        disabled={this.state.dqRuleSchedule !== ''}
                        >
                      </FormTextarea>
                    </Col>
                  </Row>

                  <div className="divider-row mt-2"></div>

                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-secondary" onClick={this.stepperDecrement}>Back</button>
                    { Object.keys(editOriginal).length === 0 ?
                      <button className="btn btn-primary" type="button" onClick={this.submitSaveRule}>Submit</button>
                      :
                      <button className="btn btn-primary" type="button" onClick={this.submitEditDQRule}>Save Changes</button>
                    }
                  </div>

                </>
              }
            </Form>


          </ModalBody>

          {/* <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Save Changes
          </Button>
          </Modal.Footer> */}
        </Modal>



    )
  }
}

export BaseModal;