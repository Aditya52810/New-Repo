import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactTable from "react-table";
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';

// notifications 
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormInput,
  FormSelect,
} from "shards-react";

// import '../style.css';

// import './MetricsRepo.scss'

import {
  Scheduler
} from '../DQRuleAuthoring/PatternForms'

// Services

import {
  getSuggestion
} from '../../services/DQSuggestionService';

import {
  addSuggestion
} from '../../services/DQRAService';




// -----------------------------------

const AddSuggestionModal = ({ suggestionData, show, toggle }) => {
  const initialForm = {
    ruleDefinition: '',
    criticality: 'High',
    schedulerData: {
      dqRuleDayWeek: '',
      ruleCheckStartTime: 12,
      ruleCheckStartTimeAMPM: 'AM',
      ruleCheckDayofWeek: '',
      loadDatasql: '',
    }
  }

  let [suggestionForm, updateSuggestionForm] = useState(initialForm)

  const updateScheduler = e => {
    updateSuggestionForm({ ...suggestionForm, schedulerData: { ...suggestionForm.schedulerData, [e.target.name]: e.target.value } })
  }

  const addSuggestionRule = () => {
    const {
      ruleDefinition,
      criticality,
      schedulerData,
    } = suggestionForm

    const {
      code_for_constraint,
      Data_Entity,
      column_name,
      constraint_description,
    } = suggestionData

    const suggestionInfo = {
      ruleDefinition,
      dataSubjectArea: 'Transaction Position',
      dataConcept: Data_Entity,
      dataElement: column_name,
      dq_rule_pattern: constraint_description,
      deequ: code_for_constraint,
      criticality,
    }

    const suggestionPayload = {
      suggestionInfo,
      suggestionData
      
    }

    console.log("suggestion Info", suggestionInfo)

    addSuggestion(suggestionPayload).then(res => {
      console.log(res)
      if (res.status === 201) {
        toast.success(`Successfully added rule - ${ruleDefinition} `, {})
        toggle()
      }
    }).catch( err => {
      console.log("status", err.toJSON())
      console.log("Error when adding from dq suggestions")
       toast.error(`Error occured when adding - ${ruleDefinition}`, {})
  
    })

  }

  return (
    <Modal
      open={show}
      toggle={toggle}
      className="dqra-rule-popup"
      backdropClassName="blur-modal-backdrop"
      size="md"
    >
      <ModalHeader>
        <label>Add Suggested Rule - </label>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}><label>Data Entity: </label></Col>
          <Col md={6}>
            {suggestionData.Data_Entity}
            {/* <FormSelect
              placeholder="Select from options"
              name="dqRuleDayWeek"
              value={' '}
              onChange={' '}
              disabled={' '}
            >

            </FormSelect> */}
          </Col>
        </Row>
        <Row>
          <Col md={6}><label>Data Element: </label></Col>
          <Col md={6}> {suggestionData.column_name} </Col>
        </Row>
        <Row>
          <Col md={12}><label>Description: </label></Col>
          <Col md={12}> {suggestionData.rule_description} </Col>


        </Row>
        <Row>
          <Col md={6}>
            <label>Rule Title</label>
            <FormInput
              name="ruleDefinition"
              type="text"
              placeholder="Enter Rule Definition"
              value={suggestionForm.ruleDefinition}
              onChange={e => updateSuggestionForm({ ...suggestionForm, "ruleDefinition": e.target.value })}
            />
          </Col>
          {/* </Row>
        <Row> */}
          <Col md={6}>
            <label>Criticality</label>
            <FormSelect
              name="criticality"
              value={suggestionForm.criticality}
              onChange={e => updateSuggestionForm({ ...suggestionForm, criticality: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </FormSelect>
          </Col>
        </Row>
        {/* <Scheduler dataLoad={false} schedulerData={suggestionForm.schedulerData} onChange={updateScheduler} /> */}
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <button className="btn btn-info" onClick={toggle}>
          Close
        </button>
        <button
          disabled={suggestionForm.ruleDefinition.length === 0}
          className="btn btn-primary"
          onClick={addSuggestionRule}
        >
          Add Rule
        </button>
      </ModalFooter>
    </Modal>
  )

}


function Suggestions() {
  const pageSize = 10;
  const [data, setData] = useState([]);
  const [showAddSuggestionsForm, setShowAddSuggestionForm] = useState(false);
  const [suggestionRowData, setSuggestionRowData] = useState({});
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchCallback(filteredData) {
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500), []);//eslint-disable-line react-hooks/exhaustive-deps
  const searchProp = "column_name";
  const filterProps = {
    searchProp,
    searchColumn: "Column",

    searchCallback: debounceFn
  };

  const tableData = useMemo(() => {
    return data.filter((a) => {
      if (searchFilter === "") {
        return true;
      }
      if (a && a[searchProp]) {
        return a[searchProp].toLowerCase().includes(searchFilter.toLowerCase());
      }
      return false;
    })
  }, [data, searchFilter]);


  const tableColumns = [
    {
      expander: true,
      width: 50,
      Expander: ({ isExpanded }) => {
        return <div>{isExpanded ? <i className='fas fa-chevron-down' /> : <i className='fas fa-chevron-right' />}</div>
      },
      style: {
        fontSize: 20,
        padding: 0,
        paddingLeft: 12,
        textAlign: "center",
        text: "i",
        userSelect: "none"
      }

    },
    {
      Header: "Data Entity (Table)",
      maxWidth: 180,
      accessor: "Data_Entity",
      className: "text-left",
      style: { 'whiteSpace': 'unset' },
      headerClassName: 'table-header-bg'
    },
    {
      Header: "Column",
      maxWidth: 350,
      accessor: "column_name",
      className: "text-left",
      style: { 'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden' },
      headerClassName: 'table-header-bg'
    },
    {
      Header: "DQ Rule Type",
      //  maxWidth: 250,
      accessor: "code_for_constraint",
      className: "text-left",
      style: { 'whiteSpace': 'unset' },
      headerClassName: 'table-header-bg'
    },
    // {
    //   Header: "Description",
    //   accessor: "rule_description",
    //   className: "text-left",
    //   style: { 'whiteSpace': 'unset' },
    //   headerClassName: 'table-header-bg'
    // },
    {
      Header: "Actions",
      accessor: "",
      className: "text-left",
      maxWidth: 200,
      style: { 'whiteSpace': 'unset', 'justifyContent': 'center' },
      headerClassName: 'table-header-bg',
      Cell: ({ original }) => (
        <Button theme="success" title="RunNow" onClick={() => toggleAddSuggestion(original)}>
          {/*<i cassName="fas fa-plus"></i>*/}
          Add Suggestion
        </Button>
      )
    }

  ];

  useEffect(() => {
    getSuggestion().then(res => {
      if (res.status === 200) {
        setData([...res.data.data]);
        /*
        console.log('Suggestions: ', 
          JSON.stringify(
            res.data.data
          )
        )
        */
      }
    }).catch(err => {
      console.log(err)
    })
  }, []);

  function toggleAddSuggestion(row) {
    if (row === undefined) {
      setShowAddSuggestionForm(!showAddSuggestionsForm);
      return
    }

    setShowAddSuggestionForm(!showAddSuggestionsForm);
    setSuggestionRowData({ ...row });
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/*<AlertMessage message={"test message"} delaySeconds={10} />*/}
      <Card className="p-0">
        <CardHeader className="p-0">
          <Container fluid className="file-manager__filters border-bottom">
            <Row>
              <Col className="file-manager__filters__rows d-flex" md="3">
                Suggested Data Quality Rules
              </Col>
              <Col md="6"></Col>
              <Col className=" d-flex" md="3">
                <TableFilter {...filterProps} />
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
              SubComponent={({ original }) => {
                return (<Container fluid className="sub-component-container pt-4 pb-4">
                  <Row>
                    <Col md="9">
                      <div className="desc">Description:</div>
                      <div>{original.rule_description}</div>
                    </Col>
                  </Row>

                </Container>);
              }}
            />
          </div>
        </CardBody>
      </Card>

      <AddSuggestionModal suggestionData={suggestionRowData} show={showAddSuggestionsForm} toggle={toggleAddSuggestion} />

    </Container>
  )
}
export default Suggestions;
