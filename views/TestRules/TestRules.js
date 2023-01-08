import React, {  useState, useEffect, useMemo, useCallback } from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import ReactTable from "react-table";

import { 
  getRuleTestSummaries
} from '../../services/ExecSummaryService';

import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';

function TestRules () {
  
  const [pageSize] = useState(15); 
  const [progressData, setProgressData] = useState([]);
  const [progressSearch, setProgressSearch] = useState('');
  const [completedData, setCompletedData] = useState([]);
  const [completedSearch, setCompletedSearch] = useState('');

  function handleProgressSearchCallback(filteredData){    
    setProgressSearch(filteredData);
  }
  const debounceProgressFn = useCallback(_debounce(handleProgressSearchCallback, 500),[]);//eslint-disable-line react-hooks/exhaustive-deps
  const filterProgressSearchProp =  "Entity_Name";
  const filterProgressProps = {
    searchProp: filterProgressSearchProp,
    searchColumn: "Data Entity (Table)",
    searchCallback: debounceProgressFn
  };

  const inProgressTableData = useMemo( () => {
    return progressData.filter( (a) => {
      if(progressSearch === ""){
        return true;
      }
      if(a && a[filterProgressSearchProp]){
        return a[filterProgressSearchProp].toLowerCase().includes(progressSearch.toLowerCase());
      }
      return false;
    })
  }, [progressData, progressSearch]);

  function handleCompletedSearchCallback(filteredData){    
    setCompletedSearch(filteredData);
  }
  const debounceCompletedFn = useCallback(_debounce(handleCompletedSearchCallback, 500),[]); //eslint-disable-line react-hooks/exhaustive-deps
  const searchProp = "Source_System";
  const filterCompletedProps = {
    searchProp,
    searchColumn: "Data Entity (Entity)",
    searchCallback: debounceCompletedFn
  };

  const completedTableData = useMemo( () => {
    return completedData.filter( (a) => {
     if(completedSearch === ""){
        return true;
      }
      if(a && a[searchProp]){
        return a[searchProp].toLowerCase().includes(completedSearch.toLowerCase());
      }
      return false;
    })
  }, [completedData, completedSearch]);

  useEffect( () => {

    getRuleTestSummaries().then( res => {
      if (res.status === 200) {
        const rawTestData = res?.data?.data;
        const activeRuns = rawTestData.filter( d => d.Execution_Status === 'Queued');

        const adhocRequestResultRaw = res?.data?.summaries;
        setProgressData(activeRuns);
        setCompletedData(adhocRequestResultRaw);
      }
    }).catch( err => {
      console.log(err)
    })
  },[]);
	  
		const resultsTableColumns = [
      {
        Header: "Rule Id",
        accessor: "DQ_RuleId",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Data Entity (Entity)",
        accessor: "Source_System",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Rule Name",
        accessor: d => d["master_rule_datum.Definition"],
        id: "master_rule_datum.Definition",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Status",
        accessor: "constraint_status",
        className: ({ original }) => { return original.constraint_status === "Success" ? "text-left text-success" : "text-left text-danger"},
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Last Run Date",
        accessor: "Execution_Date",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Criticality",
        accessor: "criticality",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      }
    ];

    const activeTestTableColumns = [
      {
        Header: "Rule Id",
        accessor: "Rule_Id",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Data Entity (Table)",
        accessor: "Entity_Name",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => ( original.Entity_Name )
      },
      {
        Header: "Data Element (Column)",
        accessor: "Data_Element",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Test Status",
        accessor: "Execution_Status",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => ( original.Execution_Status === 'Queued' ? 'Running' : '' )
      },
    ];

		return (
			<Container fluid className="main-content-container px-4 pb-4">
        <Card className="p-0 mb-4">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">

              <Row>
                <Col className="file-manager__filters__rows d-flex" md="9">
                  Rule Execution Progress
                </Col>
                <Col className="d-flex" md="3">
                  <TableFilter {...filterProgressProps} />
                </Col>
              </Row>

            </Container>
          </CardHeader>

          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={activeTestTableColumns}
                resizable={false}
                pageSize={5}
                data={inProgressTableData}
                showPageSizeOptions={false}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">

              <Row>
                <Col className="file-manager__filters__rows d-flex" md="9">
                  Rule Execution Results
                </Col>
                <Col className="d-flex" md="3">
                  <TableFilter {...filterCompletedProps} />
                </Col>
              </Row>

            </Container>
          </CardHeader>

          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={resultsTableColumns}
                resizable={false}
                pageSize={pageSize}
                data={completedTableData}
                showPageSizeOptions={false}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
		)	
}

export default TestRules;