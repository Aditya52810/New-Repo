import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
  Form,
} from "shards-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import '../style.css';

import './DQRuleAuthoring.scss'

// Services
import { 
  submitRule, 
  editRule,
  getSourceMetadata,
} from '../../services/DQRAService';

// -----------------------------------

// Create DQ Rule pages
import {
  // page 1
  RuleDefinitionPage,

  // page 2
  RuleConfig,
  
  // page 3
 // Scheduler,
} from './PatternForms';


const defaultDefinitionData = {
  ruleDefintion: '',
  dqRuleType: '',
  dqPattern: '',
  dqPatternId: '0',

  dataSubjectArea: '',
  dataConcept: '',
  dataElement: '',

  // constraints: '',
  // criticality: '',
}

const defaultConstraintData = {
  constraints: '',
  criticality: '',
  // columns: '',
  // lambda: '',
  // hint: '',
  // criticality: 'High',
}

const defaultSchedulerData = {
  dqRuleDayWeek: '',
  ruleCheckStartTime: 12,
  ruleCheckStartTimeAMPM: 'AM',
  ruleCheckDayofWeek: '',
  loadDatasql: '',
};

function DQRuleCreate({ showStepper, toggle, onChangeData, originalRowData, actionFormType }) {
  // const [authoringState, setAuthoringState] =  useState(ruleAuthoringState);
  // console.log(actionFormType, originalRowData)
  const originalDefinitionData = {
    ruleDefinition: originalRowData?.Rule_Description,
    dqRuleType: originalRowData?.DQ_Rule_Type,

    dqPattern: originalRowData?.DQ_Rule_Pattern,
    dqPatternId: '',

    dataSubjectArea: originalRowData?.Data_Subject,
    dataConcept: originalRowData?.Data_Entity,
    dataElement: originalRowData?.Column_Name,

    // constraints: originalRowData?.Constraint,
    // criticality: originalRowData?.Criticality,
  }

  const originalConstraintData = {
    constraints: originalRowData?.Constraint,
    criticality: originalRowData?.Criticality,
  }

  const originalSchedulerData = {
    dqRuleDayWeek: originalRowData?.schedulerConstraintsJSON?.SchedulerConfig?.dqRuleDayWeek,
    ruleCheckStartTime: originalRowData?.schedulerConstraintsJSON?.SchedulerConfig?.ruleCheckStartTime,
    ruleCheckStartTimeAMPM: originalRowData?.schedulerConstraintsJSON?.SchedulerConfig?.ruleCheckStartTimeAMPM,
    ruleCheckDayofWeek: originalRowData?.schedulerConstraintsJSON?.SchedulerConfig?.ruleCheckDayofWeek,
    loadDatasql: originalRowData?.schedulerConstraintsJSON?.SchedulerConfig?.loadDatasql,
  };

  const useNonDefaultDataForms = actionFormType === 'EDIT' || actionFormType === 'CLONE'

  const [definitionData, setDefinitionData] = useState(useNonDefaultDataForms ? originalDefinitionData : defaultDefinitionData)
  const [constraintData, setConstraintData] = useState(useNonDefaultDataForms ? originalConstraintData : defaultConstraintData)
  const [schedulerData, setSchedulerData] = useState(useNonDefaultDataForms ? originalSchedulerData : defaultSchedulerData)


  const [authoringState, setAuthoringState] = useState({
    // definition: defaultDefinitionData,
    // constriants: defaultConstraintData,
    // scheduler: defaultSchedulerData,
    step: 1,
    action: actionFormType || 'CREATE',
    onEditRuleId: originalRowData?.DQ_RuleId,
  });

  const [metadataFields, setMetadata] = useState([])
  const [dqFunctions, setDQFunctions] = useState([])


  // set initial form for CREATE, EDIT/CLONE
  // useEffect( () => {
  //   setAuthoringState(ruleAuthoringState);
  // },[ruleAuthoringState])


  // fetch data elements and pydeequ functions
  useEffect(() =>{
    getSourceMetadata().then( res => {

      let metadataString = res?.data?.sourceMetadata
      let dqFunc = res?.data?.dqFunctions

      for (let keys in metadataString) {
        const columnsString = metadataString[keys].split(' ')
        const columnsArray = columnsString.reduce( (acc, curr) => {
          acc.push(curr.trim())
          return acc
        }, [])
        metadataString[keys] = columnsArray
      }
     console.log(metadataString, dqFunc)
      // setAuthoringState({...authoringState, dataSubjectConceptElement: metadataString, dqFunctions });
      setMetadata(metadataString)
      // console.log(dqFunc)
      setDQFunctions(dqFunc)
    }).catch( err => {
      console.log("Metadata fetch error", err?.toJSON())
    })

  }, []);

  const onChange = key => e => {
    e.preventDefault()
    setAuthoringState({...authoringState, [key]: e.target.value });
  };

  // FOR STATES WITH OBJECTS
  const onChangePattern = key => e => {
    e.preventDefault()
    const { name, value } = e.target;
    setAuthoringState({...authoringState, [key]: { ...authoringState[key], [name]: value } })
  }


  const onChangeDefinition = e => {
    // e.preventDefault()
    const { name, value } = e?.target;
    setDefinitionData({ ...definitionData, [name]: value })
  }

  const onChangeConstraint = e => {
    // e.preventDefault()
    const { name, value } = e?.target;
    setConstraintData({ ...constraintData, [name]: value })
  }

  const onChangeScheduler = e => {
    // e.preventDefault()
    const { name, value } = e?.target;
    setSchedulerData({ ...schedulerData, [name]: value })
  }

  const stepperIncrement = () => {
    const { dqPattern, step } = authoringState;
    let nextStep = step
    if (nextStep === 1 
      && ( dqPattern === "Null or Blank"
      || dqPattern === "Non Negative"
      || dqPattern === "Uniqueness" )
    ) {
      nextStep = nextStep + 2
    } else nextStep = nextStep + 1
    if (nextStep <= 3) {
      setAuthoringState({...authoringState, step: nextStep })
    }
  }

  const stepperDecrement = () => {
    const { dqPattern, step } = authoringState;
    let nextStep = step
    if (nextStep === 3 
      && ( dqPattern === "Null or Blank"
      || dqPattern === "Non Negative"
      || dqPattern === "Uniqueness" )
    ) {
      nextStep = nextStep - 2
    } else nextStep = nextStep - 1
    if (nextStep > 0) {
      setAuthoringState({...authoringState, step: nextStep })
    }
  }

  const clearForm = () => {
    setDefinitionData(defaultDefinitionData)
    setConstraintData(defaultConstraintData)
    setSchedulerData(defaultSchedulerData)

    setAuthoringState({
      // showStepper: !authoringState.showStepper,
      // definition: defaultDefinitionData,
      // constriants: defaultConstraintData,
      // scheduler: defaultSchedulerData,
      step: 1,
      action: 'CREATE',
      onEditRuleId: '',
    })
  }

  const submitSaveRule = () => {
    const {
      // definition,
      // constraints,
      // scheduler,

      action,

    } = authoringState;

    const dqRuleData = {
      dqLevel: definitionData.dqRuleType,
      ruleStrategy: definitionData.dqPattern,
      ruleStrategyId: '',
      ruleTitle: definitionData.ruleDefinition,
      dataSubject: definitionData.dataSubjectArea,
      dataConcept: definitionData.dataConcept,
      dataElement: definitionData.dataElement,

      constraints: constraintData.constraints,//[dataElement, constraintData.lambda || '', constraintData.hint || ''], // (column, assertion, hint)
      criticality: constraintData.criticality,
     // schedulerConfig: schedulerData,
    }

    // Write rule with API
    submitRule(dqRuleData).then( res => {
      if(res.status === 201) {
       console.log(dqRuleData, res)
        onChangeData(res.data, authoringState);
        toast.success(`Your rule was successfully created - ${ruleDefinition}`)
        clearForm()
      }
      
      toggle();
    }).catch( err => {
      toast.warning(`Something went wrong. Rule failed to create.`);
    });
  }


  const submitEditDQRule = () => {
    const {
      // definition: defaultDefinitionData,
      // constriants: defaultConstraintsData,
      // scheduler: defaultSchedulerData,
      onEditRuleId,
    } = authoringState;

    const dqRuleData = {
      DQ_RuleId: onEditRuleId,
      dqLevel: definitionData.dqRuleType,
      ruleStrategy: definitionData.dqPattern,
      ruleTitle: definitionData.ruleDefinition,
      dataSubject: definitionData.dataSubjectArea,
      dataConcept: definitionData.dataConcept,
      dataElement: definitionData.dataElement,

      constraints: constraintData.constraints,//[dataElement, constraintData.lambda || '', constraintData.hint || ''], // (column, assertion, hint)
      criticality: constraintData.criticality,
    //  schedulerConfig: schedulerData
    }

    editRule(dqRuleData).then( res => {
      if (res.status === 201) {
        onChangeData(res.data.data, authoringState);
        // formatTableData(res.data.data)
        toast.success(`Your changes have been saved - ${ruleDefinition}`)
        clearForm()
      }

      toggle();
    }).catch( err => {
      toast.warning(`Something went wrong. Rule failed to create.`);
    });
  }


  function isNotNullOrEmpty(value){
    if(!(value === null || value === undefined || value === "")){
      return true;
    }
    return false;
  }

  const {
    // showAddDQRule,
    step,
    onEditRuleId,
    action,
    
    // RuleDefinition,
    // dataSubjectArea,
    // dataConcept,
    // dataElement,
    // dqRuleType,
    // dqPattern,
    // dqPatternId,

    // dataSubjectConceptElement,
    // dqFunctions,

    // constraints,

    // schedulerData

  } = authoringState;


  const {
    ruleDefinition,
    dqRuleType,
    dqPattern,
    dqPatternId,
    dataSubjectArea,
    dataConcept,
    dataElement,

    // constraints,
    // criticality
  } = definitionData

  const {
    constraints,
    criticality 
  } = constraintData

  // const scheduler = schedulerData

  const enableRuleDefinition = isNotNullOrEmpty(ruleDefinition) 
    && isNotNullOrEmpty(dataConcept) 
    && isNotNullOrEmpty(dataElement) 
    && isNotNullOrEmpty(dataSubjectArea) 
    && isNotNullOrEmpty(dqPattern) 
    && isNotNullOrEmpty(dqRuleType);

  const enableScheduler = isNotNullOrEmpty(schedulerData.dqRuleDayWeek) || isNotNullOrEmpty(schedulerData.loadDatasql);

  return (
    <Modal 
      open={showStepper}
      toggle={toggle} 
      className="dqra-rule-popup"
      backdropClassName="blur-modal-backdrop" 
      size="lg" 
      keyboard={false}
    >
      <ModalHeader className="p-3">
        <Container fluid >
          <Row>
            <Col md={11} sm={11}>
              <div className="modal-title"> DQ Rule Authoring </div>
            </Col>
            <Col md={1} sm={1} onClick={toggle}>
              <span className="modal-close"> <i className="fas fa-times"></i></span>
            </Col>
          </Row>
        </Container>
      </ModalHeader>

      <ModalBody className="p-3">
        <div className="d-flex justify-content-between">
          <div className={`stepper-step-icon-new d-flex justify-content-center ${step === 1 ? "stepper-step-icon-active" : step > 1 ? "stepper-step-icon-complete" : "stepper-step-icon-inactive"}`}>
          { step > 1 && <i className="fas fa-check-circle"></i> }
          { step === 1 && <i className="fas fa-lock-open"></i> }
          </div>
          <div className="stepper-progress">
            <Progress className={step > 1 ? 'step-complete' : 'step-pending'} value={step === 1 ? 50 : step > 1 ? 100 : 0} />
          </div>
          <div className={`stepper-step-icon-new d-flex justify-content-center ${step === 2 ? "stepper-step-icon-active" : "stepper-step-icon-inactive"}`}>              {/* step > 2 ? "stepper-step-icon-complete" :  */}
          { step > 2 && <i className="fas fa-check-circle"></i> }
          { step === 2 && <i className="fas fa-lock-open"></i> }
          { step < 2 && <i className="fas fa-lock"></i> }
          </div>
          {/* <div className="stepper-progress">
            <Progress value={step === 2 ? 50 : step > 2 ? 100 : 0} />
          </div>
          <div className={`stepper-step-icon-new d-flex justify-content-center ${step === 3 ? "stepper-step-icon-active" : "stepper-step-icon-inactive"}`}>
          { step > 3 && <i className="fas fa-check-circle"></i> }
          { step === 3 && <i className="fas fa-lock-open"></i> }
          { step < 3 && <i className="fas fa-lock"></i> }
          </div> */}
        </div>

        <div className="d-flex justify-content-between stepper-step mt-1 mb-2">
          <div>Rule Definition</div>
          <div>Rule Pattern</div>
          {/* <div>Scheduler</div> */}
        </div>

        <div className="divider-row"></div>

        <Form className="mt-3 rule-builder-form">
          { step === 1 &&
            <>
              <RuleDefinitionPage
                pageData={{
                  ruleDefinition, // str
                  dataSubjectArea,
                  dataConcept,
                  dataElement,
                  dqRuleType,
                  dqPattern,
                  dqPatternId,
                  metadataFields, // arr
                  dqFunctions, // arr,
                  // constraints,
                  // criticality
                }}
                onChange={onChangeDefinition}
              />

              <div className="divider-row"></div>

              <div className="d-flex justify-content-between mt-2">
                <button
                  disabled={ruleDefinition?.length === 0}
                  className="btn btn-info"
                  onClick={clearForm}
                >
                  Clear
                </button>
                <button
                  // disabled={!enableRuleDefinition}
                  className="btn btn-primary"
                  onClick={stepperIncrement}
                >
                  Next
                </button>
              </div>
            </>
          }
          { step === 2 &&
            <>
              { dqPattern === 'Custom Check'
                ? null
                : <RuleConfig configData={{constraints, dqPattern, ruleDefinition, criticality}} onChange={onChangeConstraint} isCustom={dqPattern === 'Custom check'}/>
              }

              <div className="divider-row mt-3"></div>

              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-secondary"
                  onClick={stepperDecrement}
                >
                  Back
                </button>
                { action === 'CREATE' || action === 'CLONE' ?
                <button className="btn btn-primary" type="button"
                 //disabled={!enableScheduler} 
                 onClick={submitSaveRule}>Submit</button>
                :
                <button className="btn btn-primary" type="button" disabled={!enableScheduler} onClick={submitEditDQRule}>Save Changes</button>
              }
                {/* <button
                  className="btn btn-primary ml-2"
                  onClick={stepperIncrement}
                  disabled={!(
                    dqPattern === 'Negative check' 
                    || dqPattern === 'Null check'
                    || dqPattern.includes('Null') 
                    || dqPattern === 'Uniqueness check')
                    && constraints.lambda.length === 0
                  }
                >
                  Next
                </button> */}
              </div>
            </>
          }
          {/* { step === 3 &&
            <>
             // <Scheduler dataLoad={false} schedulerData={schedulerData} onChange={onChangeScheduler} />

              <div className="divider-row mt-2"></div>

              <div className="d-flex justify-content-between mt-2">
              <button className="btn btn-secondary" onClick={stepperDecrement}>Back</button>
              { action === 'CREATE' || action === 'CLONE' ?
                <button className="btn btn-primary" type="button" disabled={!enableScheduler} onClick={submitSaveRule}>Submit</button>
                :
                <button className="btn btn-primary" type="button" disabled={!enableScheduler} onClick={submitEditDQRule}>Save Changes</button>
              }
              </div>
            </>
          } */}
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default DQRuleCreate;
