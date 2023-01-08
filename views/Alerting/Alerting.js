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
    getAlertingSummary,getAlertingSummary1
} from '../../services/AlertingService';
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';


// -----------------------------------


function Alerting () {

 
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


  useEffect(() => {
    getAlertingSummary().then(res => {
      if (res.status === 200)  {
    //    if (res.data.data.Status==='failure')
    //    {
        setData([...res.data.data]);
        for (let i = 0; i < res.data.data.length; i++) {
          if(res.data.data[i].Status ==='Failure' ) 
          {
            console.log(res.data.data[i]);
           // setData([...res.data.data][i]);
          }
        }
        
      
      }
    }).catch( err => {
      console.log(err)
    })
    // const query = "SELECT * FROM anamoly_results WHERE Status = 'Faliure'";
      
    //       getAlertingSummary(query, [], (err, res) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           this.setData({ data: res.rows });
    //         }
    //       });

    // getAlertingSummary().then(res => {
    //   if (res.status === 200)  {
    //    if (res.data.data.Status==='failure')
    //    {
    //    setData([...res.data.data]);}
    //     // for (let i = 0; i < res.data.data.length; i++) {
    //     //   if(res.data.data[i].Status ==='Failure' ) 
    //     //   {
    //     //     console.log(res.data.data[i]);
    //     //    // setData([...res.data.data][i]);
    //     //   }
    //     // }
        
    //     /*
    //     console.log('alerting', 
    //       JSON.stringify(
    //         res.data.data
    //       )
    //     )
    //     */
    //   }
    // }).catch( err => {
    //   console.log(err)
    // })
  }, []);

  
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
        Header: "Data Entity",
        accessor: "Data_Entity",
        maxWidth: 180,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Anomaly Type/ Column Name",
        accessor: "Anamoly_Type",
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
    //   {
    //     Header: "Column Name",
    //     accessor: "column_name",
    //     className: "text-left",
    //     style: { 'whiteSpace': 'unset' },
    //     headerClassName: 'table-header-bg'
    //   },
    //   {
    //     Header: "Success",
    //     accessor: "Detected_Value",
    //     className: "text-left",
    //     style: { 'whiteSpace': 'unset' },
    //     headerClassName: 'table-header-bg'
    //   },
      
      {
        Header: "Status",
        accessor: "Status",
       
        className: ({ original }) => { return original.constraint_status === "Failure" ? "text-left text-success" : "text-left text-danger"},        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
    //   {
    //     Header: "Date_Time",
    //     accessor: "Date_Time",
    //     className: "text-left",
    //     style: { 'whiteSpace': 'unset' },
    //     headerClassName: 'table-header-bg'
    //   },
      
     
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">

              <Row>
                <Col className="file-manager__filters__rows d-flex" md="9">
                  Alerting
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
export default Alerting;
