import React, { useState,  useEffect, useMemo, useCallback } from 'react';
import ReactTable from "react-table";

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
} from "shards-react";

// import '../style.css';

// import './MetricsRepo.scss'

// Services

import { 
  getLandingZoneProfiles
} from '../../services/ExecSummaryService';
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';


// -----------------------------------


export default function LandingZoneHistory () {
  const [pageSize] = useState(5);
  const [data, setData] = useState([]);
  const [showProfiler, setShowProfiler] = useState(false);
  const [profilerPath, setProfilerPath] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]); //eslint-disable-line react-hooks/exhaustive-deps
  const searchProp =  "File_Name";
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
  

    getLandingZoneProfiles().then( res => {
      if (res.status === 200) {
        setData([...res.data.data]);
        /*
        console.log('Landing Zone History: ', 
          JSON.stringify(
            res.data.data
          )
        )
        */
      }
    })
  },[]);

  function handleProfiler (){
    setShowProfiler(!showProfiler);
  }

  function loadProfilerPath(path) {
    setProfilerPath(path);
    handleProfiler();
  }

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

     // "File_Name",
     //    "File_Size",
     //    "CDEs",
     //    "Record_Count",
     //    "File_Date",
     //    "Profile_Path"

    const tableColumns = [
      {
        Header: "Date",
        accessor: "Date_Time",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
	// Cell: ({ original }) => new Date(original.File_Date).toLocaleString(),


  


      },
      {
        Header: "Data Entity",
        accessor: "Data_Entity",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "CDE Columns",
        accessor: "Columns",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Total Records",
        accessor: "Records",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "File Type",
        accessor: "File_Type",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      // {
      //   Header: "Profile Path",
      //   accessor: "Profile_Path",
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      // },
      {
        Header: "Profiled Results",
        accessor: "Profiler_Path",
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'center' },
        headerClassName: 'table-header-bg',
        Cell: ({ original }) => (<Button onClick={() => loadProfilerPath('https://admuirepo.blob.core.windows.net/test2/Demo1_profilingout22-12-07 04_26_08.html')} >Show Profiler</Button>)
       
        // Cell: ({ original }) => (<Button onClick={() => loadProfilerPath(original.Profile_Path)} >Show Profiler</Button>)
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">

              <Row>
                <Col className="file-manager__filters__rows d-flex" md="9">
                  Data Source Profilers
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

        <Modal open={showProfiler} toggle={handleProfiler} size='lg' className="h-100">
          <ModalHeader closeAriaLabel="x">
	    <button type="button" className="float-right fas fa-times border-0 bg-white" aria-label="Close" onClick={handleProfiler}></button>
	   </ModalHeader>
          <iframe src={profilerPath} title="Profile" allowFullScreen frameBorder='0' className="w-100" height={800}/>
        </Modal>
      </Container>
    )  
}

