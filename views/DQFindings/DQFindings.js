import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactTable from "react-table";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Button,
} from "shards-react";

import { dqfind } from "../../services";

// import colors from "../../utils/colors";
import { 
  getStatusClass
} from "../../utils/colorSelector";

import './DQFindings.scss'

import { FindingDetail } from './FindingDetail';
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';

function DsaMain(){
  const pageSizeOptions = [10, 15, 20, 25, 30];
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [checked, setChecked] = useState([]);
  const [showRowDetail, setShowRowDetail] = useState(false);
  const [rowOriginalData, setRowOriginalData] = useState({});
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]);//eslint-disable-line react-hooks/exhaustive-deps

  const searchProp = "dataElement";
  const filterProps = {
    searchProp,
    searchColumn: "Rule Description",

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


  useEffect(() =>{
    // const tableData = getDQFindingsData();
    dqfind().then(res => {
      if(res.status ===  200) {
        const tableData = res.data.data
        // const tableData = data.reduce( (acc, curr) => {
        //   const dataElement = curr.constraint.split('(')[2].split(',')[0]
        //   acc.push({ ...curr, dataElement})

        //   return acc
        // }, [])
	 // console.log(tableData)
        setData(tableData)
      }
    }).catch( err => {
      console.log(err)
    });
    

    // Initialize the fuzzy searcher.
    // searcher = new FuzzySearch(tableData, ["subarea"], {
    //   caseSensitive: false
    // });
  },[]);

  /**
   * Handles the page size change event.
   */
  function handlePageSizeChange(e) {
    setPageSize(e.target.value);
   
  }

  const toggleSelectAll = () => {
    var updatedSelection = !selectAllRows;
    setSelectAllRows(updatedSelection);

    var checkedCopy = [];

    data.forEach(function(e,i) {
      checkedCopy.push(updatedSelection);
    })

    setChecked(checkedCopy);
  }

  const selectRow = index => {

    let checkedCopy = [...checked];
    checkedCopy[index] = !checked[index];

    if(checkedCopy[index] === false){
      setSelectAllRows(false);      
    }
    setChecked(checkedCopy);

  }

  const loadFindingDetail = ({ original }) => {
    setRowOriginalData({...original});
    toggleFindingDetail()
  }

  const toggleFindingDetail = () => {
    setShowRowDetail(!showRowDetail);
  }

    const tableColumns = [
      // {
      //   Header: (
      //     <input type="checkbox"
      //     onChange={toggleSelectAll}
      //     checked={selectAllRows}/>
      //   ),
      //   sortable: false,
      //   filterable: false,
      //   //width: 40,
      //   className: "text-center",
      //   style: { 'whiteSpace': 'unset' },
      //   headerStyle: {'alignSelf': 'flex-end'},
      //   Cell : row => (
      //     <input type="checkbox"
      //     defaultChecked={checked[row.index]}
      //     checked={checked[row.index]}
      //     onChange={() => selectRow(row.index)}/>
      //   )
      // },
      // {
      //   Header: "#",
      //   accessor: "id",
      //   // width: 40,
      //   className: "text-center",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // {
      //   Header: "Subject Area",
      //   accessor: "subjectArea",
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // // {
      // //   Header: "Key",
      // //   accessor: "key",
      // //   width: 130,
      // //   className: "text-left",
      // //   style: { 'whiteSpace': 'unset' },
      // //   headerClassName: 'table-header-bg'
      // // },
      // {
      //   Header: "Rule Id",
      //   accessor: "ruleId",
      //   width: 120,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // {
      //   Header: "Run Date",
      //   accessor: "runDate",
      //   // maxWidth: 70,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
         
      //       {row.original.runDate || '-' }
      //     </div>
      //    ),
      // },
      // {
      //   Header: "Rule Description",
      //   accessor: "ruledesc",
      //   // width: 180,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // {
      //   Header: "Severity",
      //   accessor: "severity",
      //   // width: 100,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
      //     <Button onClick={() => handleItemEdit(row)}
      //       className={row.original.severity === 'Critical' ? 'btn-wid-70 btn-danger' : 
      //       ( row.original.severity === 'High') ? 'btn-wid-70 btn-warning' : 'btn-wid-70 btn-info'
      //       }
      //       style={{'color':'#fff'}}
      //     >
      //       {row.original.severity}
      //       </Button>
      //     </div>
      //    ),
      // },
      // {
      //   Header: "Created",
      //   accessor: "createdOn",
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // {
      //   Header: "Potential Data Issue",
      //   sortable: false,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
      //      <input type="radio" className="tick-mark-radio red-color-radio" name={row.original.id} onChange={() => setFindingType(row,'Issue')}/>
      //     </div>
      //    ),
      // },
      // {
      //   Header: "Expected Behavior",
      //   sortable: false,
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
      //       <input type="radio" className="tick-mark-radio green-color-radio" name={row.original.id} onChange={() => setFindingType(row,'Behavior')} />
      //     </div>
      //    ),
      // },
      // {
      //   Header: "Feedback",
      //   accessor: "createdOn",
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
      //     <Button onClick={() => .submitIssueType(row)}
      //       theme="white"
      //     >
      //       Submit
      //       </Button>
      //     </div>
      //    ),
      // },
      {
        Header: (
          <input 
            type="checkbox"
            onChange={toggleSelectAll}
            checked={selectAllRows}

          />
        ),
        sortable: false,
        filterable: false,
        width: 40,
        className: "text-center",
        style: { 'whiteSpace': 'unset' },
        headerStyle: {'alignSelf': 'flex-end'},
        Cell : row => (
          <input type="checkbox"
            // defaultChecked={checked[row.index]}
            checked={checked[row.index]}
            onChange={() => selectRow(row.index)}
          />
        )
      },
      {
        Header: "Rule Id",
        accessor: "DQ_RuleId",
        width: 120,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Run Date",
        accessor: "Execution_Date",
        // maxWidth: 70,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
      },
      {
        Header: "Rule Name",
        accessor: "Definition",
        maxWidth: 200,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Rule Description",
        accessor: "Column_Name",
        // width: 180,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
      },
      {
        Header: "Severity",
        accessor: "criticality",
        maxWidth: 150,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        tipText: "criticality high",
        Cell: row => (
          <div className="d-table mx-auto">
            <Button 
              onClick={() => loadFindingDetail(row)}
              className={ getStatusClass(row.original.criticality) }
              style={{'color':'#fff;' }}
            >
              {row.original.criticality}
            </Button>
            <span>{row.original.description}</span>
          </div>
         ),
      },
      // {
      //   Header: "Created",
      //   accessor: "createdOn",
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      // {
      //   Header: "Potential Data Issue",
      //   sortable: false,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: ({ original }) => (
      //     <div className="d-table mx-auto">
      //      <input type="radio" className="tick-mark-radio red-color-radio" name={original.DQ_RuleId} onChange={() => setFindingType(original,'Issue')}/>
      //     </div>
      //    ),
      // },
      // {
      //   Header: "Expected Behavior",
      //   sortable: false,
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
      //       <input type="radio" className="tick-mark-radio green-color-radio" name={row.original.id} onChange={() => setFindingType(row,'Behavior')} />
      //     </div>
      //    ),
      // },
      // {
      //   Header: "Feedback",
      //   accessor: "check_status",
      //   // maxWidth: 90,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg',
      //   Cell: row => (
      //     <div className="d-table mx-auto">
      //       <Button onClick={() => submitIssueType(row)} theme="white">
      //         Issue
      //       </Button>
      //       <Button onClick={() => submitIssueType(row)} theme="white">
      //         Expected
      //       </Button>
      //     </div>
      //    ),
      // },
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Modal */}
        <FindingDetail show={showRowDetail} toggle={toggleFindingDetail} data={rowOriginalData} />

        {/* Contents */}
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                <Col className="file-manager__filters__rows d-flex" md="6">
                  <span>Show</span>
                  <FormSelect
                    size="sm"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size} rows
                      </option>
                    ))}
                  </FormSelect>
                </Col>
                <Col className="d-flex" md="3">
                  <TableFilter {...filterProps} />
                </Col>
                <Col>
                  <div className="mt-2 ml-3 d-flex justify-content-end" >
                    <Button style={{'background-color':'#005eb8', 'border-color': '#005eb8' }} className="mr-2">
                      Mark Selected as Potential Data Issue
                    </Button>
                    <Button style={{'background-color':'#0091da', 'border-color': '#0091da'}}>
                      Mark Selected as Expected Behavior
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
      </Container>
    )
  
}

export default DsaMain;
