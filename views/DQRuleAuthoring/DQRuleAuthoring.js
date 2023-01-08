import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactTable from "react-table";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
} from "shards-react";

// import '../style.css';

import './DQRuleAuthoring.scss'

// Services

import { 
  getDefinedRules,
  deleteRule
} from '../../services/DQRAService';
import * as DQRAService from '../../services/DQRAService';

import { RunNowModal } from './RunNowModal';

import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';
import DQRuleCreate from "./DQRuleCreate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DQRuleAuthoring () {
  const [pageSize] = useState(5);
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [showStepper, setShowStepper] = useState(false);
  const defaultSchedulerData = {
    dqRuleDayWeek: '',
    ruleCheckStartTime: 12,
    ruleCheckStartTimeAMPM: 'AM',
    ruleCheckDayofWeek: '',
    loadDatasql: '',
  };

  const [authoringState, setAuthoringState] =  useState({
    sqlCode: '',

    RuleDefinition: '',
    dataElement: '',
    dataSubjectArea: '',
    dataConcept: '',

    dqRuleType: '',
    dqPattern: '',


    constraints: '',
    criticality: '',
    // stdDeviationPatternForm: {
    //   LowerBoundWarning: null,
    //   UpperBoundWarning: null, 
    //   LowerBoundError: null,
    //   UpperBoundError: null,
    //   BasedOnWarning: null,
    //   BasedOnError: null,
    //   MinDataPointWarning: null,
    //   MinDataPointError: null,
    //   RebalanceFrequencyWarning: 'Weekly',
    //   RebalanceFrequencyError: 'Weekly',
    // },
    // variancePatternForm: {
    //   VarianceTypeWarning: 'Month over Month',
    //   VarianceTypeError: 'Month over Month',
    //   OutlierRangeWarning: 0,
    //   OutlierRangeError: 0,
    //  // FixedValueWarning: 0,
    //  // FixedValueError: 0
    // },
    // customPatternForm: {
    //   CustomRuleWarning: '',
    //   CustomRuleError: '',
    //   CustomSQLCodeWarning: '',
    //   CustomSQLCodeError: ''
    // },
    // nullPatternForm: {
    //   dqRuleDataSourceType: '',
    //   dqRuleDataSourceName: '',
    //   dqRuleColumnname: '',
    //   dqRuleDataType: '', // remove 
    // },
    // nonNegativePatternForm: {
    //   dqRuleDataSourceType: '',
    //   dqRuleDataSourceName: '',
    //   dqRuleColumnname: '',
    //   dqRuleDataType: '', // remove 
    // },

    // constraints: {
    //   columns: '',
    //   lambda: '',
    //   hint: '',
    //   criticality: 'High',
    // },

    schedulerData: defaultSchedulerData,

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
    step: 1,
   
    
    dailyOrWeekly: '',
    daily: '',
    weekly: '',

    selectAllRows: false,
    checked: [],
    selectedRule: {},
    editOriginal: {},
    editing: false,
    editId: '',

    showRunNow: false,
    runNowData: {},
    error_msg: '',

    dataSubjectConceptElement: {},
  });

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]);//eslint-disable-line react-hooks/exhaustive-deps
  const searchProp =  "Definition";
  const filterProps = {
    searchProp,
    searchColumn: "DQ Rule Definition",
    searchCallback: debounceFn
  };

  const tableData = useMemo( () => {
    return data.filter( (a) => {
     if(searchFilter === ""){
        return true;
      }
      if(a && a[searchProp]){
        return a[searchProp].toLowerCase().includes(searchFilter.toLowerCase());
      }
      return false;
    })
  }, [data, searchFilter]);

  // useEffect( () => {
  //   // displayDQList(0)
  //   getDefinedRules().then( res => {
  //     if (res.status === 200) {
  //       formatTableData(res.data.data)
  //     }
  //   }).catch( err => {
  //     console.log(err)
  //   })


  //   // getSourceMetadata().then( res => {
  //   //   // console.log("source metadata", res.data.source_metadata)
  //   //   let metadataString = res.data.source_metadata

  //   //   for (let keys in metadataString) {
  //   //     const columnsString = metadataString[keys].slice(1, -1).split(',')
  //   //     const columnsArray = columnsString.reduce( (acc, curr) => {
  //   //       acc.push(curr.trim().slice(1, -1))
  //   //       return acc
  //   //     }, [])
  //   //     metadataString[keys] = columnsArray
  //   //   }
  //   //   setAuthoringState({...authoringState,dataSubjectConceptElement: metadataString});
  //   // }).catch( err => {

  //   // })
  //  }, []);//eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getDefinedRules().then(res => {
      if (res.status === 200) {
        setData([...res.data.data]);
      }
    }).catch(err => {
      console.log(err)
    })
  }, []);

  useEffect(()=>{
    if(showStepper === false){
      clearForm();
    }
  },[showStepper]); //eslint-disable-line react-hooks/exhaustive-deps

  function toggleAddModal() {
    setShowStepper(!showStepper);
  }

  const onCloseCleaning = () => {
    setAuthoringState({ ...authoringState, editOriginal: {}, editId: 'CREATE' })
    toggleAddModal()
  }

  const clearForm = () => {
    setAuthoringState({
      // showStepper: !authoringState.showStepper,
      ...authoringState,
      step: 1,
      RuleDefinition: '',
      dataSubjectArea: '',
      dataConcept: '',
      dataElement: '',

      dqRuleType: '',
      dqPattern: '',
      
      constraints:'',
      criticality:'',
      // constraints: { 
      //   columns: '',
      //   lambda: '',
      //   hint: '',
      //   criticality: 'High',
      // },

     // schedulerData: defaultSchedulerData,
    })
  }

  function formatTableData (data){
    let selectedRule = {}
    const fmtData = data.map( d => {
     
      selectedRule[d.id] = false;

      let SchedulerJSON = d.SchedulerConfig
      if (SchedulerJSON === null) {
        SchedulerJSON = {}
      } else {
        SchedulerJSON = JSON.parse(d.SchedulerConfig)
      }

      return {
        ...d,
        ID: parseInt(d.DQ_RuleId),
        schedulerConstraintsJSON: SchedulerJSON,
      }
    })
    setData(fmtData);
    setAuthoringState({...authoringState, selectedRule});

    clearForm();
  }

  const toggleSelectAll = () => {
    let { selectAllRows, selectedRule } = authoringState;

    selectAllRows = !selectAllRows

    setAuthoringState({...authoringState, selectAllRows, selectedRule});
  }

 const  selectRow = row => {

    let { selectedRule } = authoringState;

    selectedRule[row.ID] = !selectedRule[row.ID]

    setAuthoringState({ ...authoringState, selectedRule });
  }

  function deleteDQConfirmAlert (row) {
   const alertProps = {
      title:"Confirm to submit",
      message: "Are you sure to delete",
      buttons: [
        {
        label: 'Yes',
        onClick: () => deleteDQRule(row)
        },{
          label: 'No'
        }
      ]
    }
    confirmAlert(alertProps);
  };

  function deleteDQRule(row){
    const rowData = row
    const req = { ids: [rowData.ID] };


    deleteRule(req).then( (res) => {
      if(res.status === 200){
        const toastMsg = `DQ Rule deleted - ${row.ID}.`;
        toast.info(toastMsg);
        formatTableData(res.data.data)
      }
    })
  }

  const deleteDQRuleMulti = () => {
    const { selectedRule } = authoringState;
    var ids = [];
    tableData.forEach( row => {
      if (selectedRule[row.ID] === true) {
        ids.push(row.ID)
      } 
    })

    const req = { ids };

    deleteRule(req).then( (res) => {
      if(res.status === 200){
        formatTableData(res.data.data)
      }
    })
  }

  // function editOrCloneDQRule(row, actionType) {

  //   let constraints;

  //   // console.log(row, actionType)

  //   // if (row.schedulerConstraintsJSON.Constraints === undefined) {
  //   //   constraints = {
  //   //     columns: '',
  //   //     lambda: '',
  //   //     hint: '',
  //   //     criticality: 'High',
  //   //   }
  //   // } else {
  //   //   constraints = {
  //   //     columns: row.schedulerConstraintsJSON.Constraints[0],
  //   //     lambda: row.schedulerConstraintsJSON.Constraints[1],
  //   //     hint: row.schedulerConstraintsJSON.Constraints[2],
  //   //     criticality: row.Criticality,
  //   //   }
  //   // }

  //   setAuthoringState({
  //     ...authoringState,
  //     // constraints,
  //     // schedulerData: row.schedulerConstraintsJSON.SchedulerConfig || defaultSchedulerData,
  //     // dqPattern: row.DQ_Rule_Pattern || '',
  //     // dqRuleType: row.DQ_Rule_Type || '',

  //     // RuleDefinition: row.Definition,
  //     // dataSubjectArea: row.Data_Subject,
  //     // dataConcept: row.Data_Concept,
  //     // dataElement: row.Column_Name,

  //     // editing: true,
  //     // editId: actionType === "EDIT" ? row.DQ_RuleId: '',
  //     // step: 1

  //     editOriginal: row,
  //     editId: actionType,
  //   })
    
  //   toggleAddModal();
  // }

  const toggleRunNow = data => {
    const { showRunNow } = authoringState;

    if ( data === undefined ) {
      setAuthoringState({ ...authoringState, showRunNow: !showRunNow})
      return
    }

    let runNowData = {};
    
    runNowData = {
      dataConcept: data.Data_Entity,
      dataElement: data.Column_Name,
      ruleId: data.DQ_RuleId || data.ID,
      ruleName: data.Rule_Description
    }

    setAuthoringState({ 
      ...authoringState,
      showRunNow: !showRunNow,
      runNowData
    })

  }

    const {
      selectedRule,

      showRunNow,
      runNowData,
      editId,
      editOriginal
    } =authoringState;

    const tableColumns = [
      {
        Header: (
          <input 
            type="checkbox"
            onChange={toggleSelectAll}
            checked={authoringState.selectAllRows}
          />
        ),
        sortable: false,
        filterable: false,
        maxWidth: 30,
        minWidth: 25,
        className: "text-center",
        // style: { 'whiteSpace': 'unset' },
        // headerStyle: { 'alignSelf': 'flex-end' },
        Cell: row => (
          <input type="checkbox"
            // defaultChecked={ !!selectedRule[row.original.id] }
            checked={ selectedRule[row.original.ID] }
            onChange={ () => selectRow(row.original) }
          />
        )
      },
      {
        Header: "Rule Id",
        accessor: "ID",
        minWidth: 30,
	 maxWidth: 40,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg p-0'
      },
      {
        Header: "Data Entity",
        accessor: "Data_Entity",
        maxWidth: 150,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Column Name",
        accessor: "Column_Name",
        maxWidth: 300,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => (<div>{original.Column_Name}</div>)
      },
      {
        Header: "Description",
        accessor: "Rule_Description",
        width: 280,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => (<div>{original.Rule_Description || `Rule ${original.id}`}</div>)
      },
      {
        Header: "DQ Rule Type",
        accessor: "DQ_Rule_Type",
        maxWidth: 130,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => (<div> { original.DQ_Rule_Type || "-" }</div>)
      },
      {
        Header: "Criticality",
        accessor: "Criticality",
        minWidth: 80,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        //Cell: ({ original }) => (original.schedulerConstraintsJSON.DQLevel || " - ")
      },
      {
        Header: "Constraint",
        accessor: "Constraint",
        width: 150,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "DQ Rule Pattern",
        //accessor: "DQ_Rule_Pattern",
        maxWidth: 150,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'wordBreak': 'break-all' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => (<div key={original.id}>{ original.DQ_Rule_Pattern || original.schedulerConstraintsJSON.RuleStrategy }</div>)
      },
      // {
      //   Header: "Actions",
      //   sortable: false,
      //   filterable: false,
      //   minWidth: 270,
      //   maxWidth: 400,
      //   style: { 'whiteSpace': 'unset', 'justifyContent': 'center' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <ButtonGroup className="d-flex justify-content-center">
      //       <Button outline title="RunNow" onClick={ () => toggleRunNow(row.original) }>
      //         {/*<i className="fas fa-play"></i>*/}Run
      //       </Button>
      //       <Button outline title="Edit" className="" onClick={ () => editOrCloneDQRule(row.original, "EDIT") }>
      //         {/*<i className="fas fa-pencil-alt"></i>*/}Edit
      //       </Button>
      //       <Button outline title="Clone" className="" onClick={ () =>  editOrCloneDQRule(row.original, "CLONE")}>
      //         {/*<i className="fas fa-copy" style={{'color':'#fff'}}></i>*/}Clone
      //       </Button>
      //      {/* <Button outline title="Delete" onClick={ () => deleteDQConfirmAlert(row.original) } >
      //         <i className="fas fa-trash-alt"></i>Delete
      //       </Button>  */}
      //     </ButtonGroup>
      //   )
      // }
    ];

    // console.log(editId)

    return (
      <Container data-testid="dqRuleAuthoring"  fluid className="main-content-container px-4 pb-4">
        <RunNowModal showRunNow={showRunNow} toggleRunNow={toggleRunNow.bind(this)} data={runNowData}/>
        { showStepper && 
          <DQRuleCreate
            showStepper={showStepper}
            toggle={onCloseCleaning} 
            ruleAuthoringState={authoringState}
            onChangeData={formatTableData}
            actionFormType={editId}
            originalRowData={editOriginal}
          />
        }
        
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">

              <Row>
                <Col className="file-manager__filters__rows d-flex" md="4">
                  Data Quality Rule Catalog
                </Col>
                {/*<Col className="file-manager__filters__search d-flex" md="1">
                  <span className="pull-right" onClick={handleRefresh}><i className="fas fa-sync"></i></span>
                </Col>*/}
                <Col md="3"></Col>
                <Col className="d-flex" md="2">
                  <TableFilter {...filterProps} />
                </Col>
                <Col className="m-1 d-flex justify-content-end">
                  <div className="ml-1">
                    <Button className="" style={{'backgroundColor':'#005eb8', 'borderColor': '#005eb8'}} onClick={toggleAddModal}>
                      <div className="">Add DQ Rule</div>
                    </Button>
                  </div>

                  <div className="ml-1">
                    <Button className="" style={{'backgroundColor':'#0091da', 'borderColor': '#0091da'}} onClick={deleteDQRuleMulti} >
                      <div className="">Delete Select DQ Rule</div>
                    </Button>
                  </div>
                </Col>
              </Row>

            </Container>
          </CardHeader>

          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                resizable={false}
                pageSize={pageSize}
                data={tableData}
                showPageSizeOptions={false}
              />
            </div>
          </CardBody>
        </Card>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover />
      </Container>
    )
  
}
export default DQRuleAuthoring;
