import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactTable from "react-table";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

// import '../style.css';

// import './MetricsRepo.scss'

// Services

import { 
  getExecSummaries
} from '../../services/ExecSummaryService';
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';


// -----------------------------------


function MetricsRepo () {

  const [pageSize] = useState(10);
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]); //eslint-disable-line react-hooks/exhaustive-deps

  const searchProp =  "Source_System";
  const filterProps = {
    searchProp,
    searchColumn: "Data Entity",
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


  useEffect(()=> {
    

    getExecSummaries().then( res => {
      if (res.status === 200) {
        setData([...res.data.data]);
        
      }
    })

  },[]);


    /*
    "DQ_RuleId",
    "check",
    "check_level",
    "check_status",
    "constraint",
    "constraint_status",
    "dq_constraint_message",
    "dq_user_constraint_message",
    "Execution_Date",
    "criticality",
    "Source_System",
    */


    const tableColumns = [
      {
        Header: "Data Entity (Table)",
        accessor: "Data_Entity",
        maxWidth: 180,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Column",
        accessor: "column_name",
        maxWidth: 180,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Description",
        accessor: "description",
        maxWidth: 350,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Constraint",
        accessor: "constraint",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      // {
      //   Header: "Check",
      //   accessor: "check",
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // {
      //   Header: "Check Level",
      //   accessor: "check_level",
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
    
     
      
      
      {
        Header: "Status",
        accessor: "constraint_status",
        maxWidth: 100,
        className: ({ original }) => { return original.constraint_status === "Success" ? "text-left text-success" : "text-left text-danger"},
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Execution Date",
        accessor: "execution_date",
        maxWidth: 200,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
     
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">

              <Row>
                <Col className="file-manager__filters__rows d-flex" md="9">
                  Data Quality Metrics
                </Col>
                <Col className="d-flex" md="3">
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
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    )
  
}
export default MetricsRepo;
