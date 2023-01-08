import React, {
  useState,
  useEffect
} from 'react'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormSelect,
  Row,
  Col,
} from 'shards-react'

import PatternProgressBar from './PatternProgressBar'


export function RuleCreateModal({ 
  open, 
  toggle, 
  editMode,
  errorMessage
}) {
  const [step, setStep] = useState(0)

	const [ruleFormData, updateRuleData] = useState({
    ruleDefinition: '',
    dataSubject: '',
    dataConcept: '',
    dataElement: '',
    dqLevel: '',
    dqPattern: '',

    patternConstraint: {
      // lambda: '',
      // hint: '',
      constraints: '',
      criticality: ''
    },

    // schedulerData: {
    //   dqRuleDayWeek: '',
    //   ruleCheckStartTime: 12,
    //   ruleCheckStartTimeAMPM: 'AM',
    //   ruleCheckDayofWeek: '',
    //   loadDatasql: '',
    // },
  })

  // const [schedulerData, updateSchedulerData] = useState({
  //   dqRuleDayWeek: '',
  //   ruleCheckStartTime: 12,
  //   ruleCheckStartTimeAMPM: 'AM',
  //   ruleCheckDayofWeek: '',
  //   loadDatasql: '',
  // })

  const submitNewRule = () => {
    return
  }

  return (
    <>
      <Modal 
        open={open} 
        toggle={toggle}
        className="dqra-rule-popup"
        backdropClassName="blur-modal-backdrop" 
        size="md" 
      >
        <ModalHeader className="p-3">
          <Row>
            <Col md={11} sm={11}>
              <div className="modal-title"> DQ Rule Authoring </div>
            </Col>
            <Col md={1} sm={1} onClick={toggle}>
              <span className="modal-close"> <i className="fas fa-times"></i></span>
            </Col>
          </Row>
        </ModalHeader>

        <ModalBody className="p-3">
          <div className="d-flex justify-content-between">
            <div 
              className={`
                stepper-step-icon-new 
                d-flex
                justify-content-center 
                ${ step === 1 ? "stepper-step-icon-active" : step > 1 ? "stepper-step-icon-complete" : "stepper-step-icon-inactive"}
              `}
            >
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
            {/* <div className="stepper-progress">
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
            </div> */}
          </div>

          {
            errorMessage.length > 0 ? <div className="">{errorMessage}</div> : null
          }

          <div className="d-flex justify-content-between stepper-step mt-1 mb-2">
            <div>Rule Definition</div>
            <div>Rule Settings</div>
            {/* <div>Scheduler</div> */}
          </div>

          <div className="divider-row"></div>

          <Form className="mt-3 rule-builder-form">
            {step === 1 &&
              <>
                <RuleDefinitionPage 
                  pageData={{
                    ruleFormData.ruleDefinition, // str
                    ruleFormData.dataSubject,
                    ruleFormData.dataConcept,
                    ruleFormData.dataElement,
                    ruleFormData.dqLevel,
                    ruleFormData.dqPattern,
                    dataSubjectConceptElement // arr
                    
                  }} 
                  onChange={this.onChange}
                  onTextChanged={this.onTextChanged}
                  renderSuggestions={this.renderSuggestions}
                />

                <div className="divider-row"></div>

                <div className="d-flex justify-content-between mt-2">
                  <button
                    disabled={
                      ruleFormData.ruleDefinition.length === 0 || 
                      Object.keys(editOriginal).length > 0
                    }
                    className="btn btn-info"
                    onClick={this.clearForm}
                  >
                    Clear
                  </button>
                  <button
                    disabled={ 
                      dqPattern.length === 0 
                      && dqPattern !== 'Please select a DQ Rule Type' 
                      && dqPattern !== 'Please select a Pattern' 
                      && dataElement.length === 0 
                      && RuleDefinition.length === 0 
                    }
                    className="btn btn-primary"
                    onClick={this.stepperIncrement}
                  >
                    Next
                  </button>
                </div>
              </>
            }
            {step === 2 &&
              <>

                { // dqPattern === "Standard Deviation" && <StandardDeviation pageData={{dqPattern, stdDeviationPatternForm}} onChange={this.onChangePattern} /> 
                }
                <RuleConfig configData={{criticality, constraints, dqPattern}} onChange={this.onChangePattern} />
                { //dqPattern === "Variance" && <Variance pageData={{dqPattern, variancePatternForm}} onChange={this.onChangePattern} /> 
                }
                { // dqPattern === "Custom" && <CustomPattern pageData={{dqPattern, customPatternForm}} onChange={this.onChangePattern} /> 
                }
                { // dqPattern === "Null or Blank" && <NullBlankPattern pageData={{dqPattern, nullPatternForm}} onChange={this.onChangePattern} /> 
                }

                {/*
                  this.state.dqRuleType === "Syntactic" &&
                  <>
                    { dqPattern == "Non Negative" &&
                      <NonNegativePattern pageData={{dqPattern, nonNegativePatternForm}} onChange={this.onChangePattern} />
                    }
                  </>
                */}

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
                  { Object.keys(editOriginal).length === 0 ?
                    <button className="btn btn-primary" type="button" onClick={this.submitSaveRule}>Submit</button>
                    :
                    <button className="btn btn-primary" type="button" onClick={this.submitEditDQRule}>Save Changes</button>
                  }
                  {/* <button
                    className="btn btn-primary ml-2"
                    onClick={this.stepperIncrement}
                    disabled={constraints.lambda.length == 0}
                  >Next</button> */}
                </div>
              </>
            }
            {/* {step == 3 &&
              <>
                <Scheduler dataLoad={true} schedulerData={schedulerData} onChange={this.onChangePattern} />

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
            } */}
          </Form>


        </ModalBody>
      </Modal>
    </>
  );
}