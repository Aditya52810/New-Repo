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
  Modal,
  ModalHeader,
  ModalBody,
} from "shards-react";

import PieChart from "../../Common/PieChart";

//import '../Common/table.scss';
// import colors from "../../utils/colors";
import { 
  getStatusClass, 
  getStatusLabelClass, 
  transformToPieChartData
} from "../../utils/colorSelector";

import ScoreCard from "./ScoreCard";
// import './table.scss';

import {  getdsaSummary } from "../../services";
import { getpdeSumm } from "../../services/PDEService";
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';

function DsaMain () {
  const pageSizeOptions =  [5, 10, 15, 20, 25, 30];
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  const [showScoreCardModal, setShowScoreCardModal] = useState(false);
  const [selectedDsa, setSelectedDsa] = useState(null);
  const [entitiesTableData, setEntitiesTableData] = useState([]);

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]);//eslint-disable-line react-hooks/exhaustive-deps
  const searchProp =  "subjectArea";
  const filterProps = {
    searchProp,
    searchColumn: "Subject Area",

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
  

  useEffect(()=>{
    getdsaSummary().then((res) => {
      if(res.status ===  200){
        setData([...res.data.data]);
      }
    });

    getpdeSumm().then((res) => {
      if(res.status ===  200){
        setEntitiesTableData([...res.data.data]);
      }
    });
  },[])

  /**
   * Handles the page size change event.
   */
  function handlePageSizeChange(e) {
    setPageSize(e.target.value);
  }

  /**
   * Mock method for confirming transactions.
   */
  function viewScoreCardPopup(rowData) {
    setShowScoreCardModal(true);
    setSelectedDsa(rowData);
  }

  function togglePopupState(){
    if(showScoreCardModal){
      setShowScoreCardModal(!showScoreCardModal);
      setSelectedDsa(null);      
    }else{
      setShowScoreCardModal(!showScoreCardModal);
    }
  } 
 

    const tableColumns = [
      {
        expander: true,
        width: 50,
        Expander:({isExpanded})=>{        
          return <div>{isExpanded ? <i className='fas fa-chevron-down'/>: <i className='fas fa-chevron-right'/>}</div>
        },
        style: {
          fontSize: 20,
          padding: 0,
          paddingLeft: 12,
          textAlign: "center",
          userSelect:"none"
        }
  
      },
      {
        Header: "Subject Area",
        accessor: "subjectArea",
        maxWidth: 250,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      // {
      //   Header: "Description",
      //   accessor: "description",
      //   maxWidth: 400,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      {
        Header: "# of Data Elements",
        accessor: "sumDataElements",
        maxWidth: 100,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "# of CDE",
        accessor: "Columns",
        maxWidth: 100,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      // {
      //   Header: "DQ Findings",
      //   accessor: "DqFinding",
      //   maxWidth: 70,
      //   className: "text-left",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
      {
        Header: "DQ Health Score",
        accessor: "avgScore",
        maxWidth: 100,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div className={getStatusClass(row.original.avgScore)} onClick={() => viewScoreCardPopup(row.original)}>
            {parseInt(row.original.avgScore)}
          </div>
        ),
      },
      {
        Header: "Key Metrics",
        //accessor: "metrics",
        maxWidth: 600,
        className: "text-left",
        style: { 'whiteSpace': 'unset'},
        headerClassName: 'table-header-bg',
        Cell: row => (
          <Row style={{'width': '100%'}}>
             <Col sm="3" md="3" className="p-0" >
              <PieChart input={transformToPieChartData(row.original.metrics[0].score)}></PieChart>
              <div className={getStatusLabelClass(row.original.metrics[0].score)}>
                Accuracy
              </div>
            </Col>
            <Col sm="3" md="3" className="p-0">
              <PieChart input={transformToPieChartData(row.original.metrics[1].score)}></PieChart>
              <div className={getStatusLabelClass(row.original.metrics[1].score)}>
                Completeness
              </div>
            </Col>
            <Col sm="3" md="3" className="p-0">
              <PieChart input={transformToPieChartData(row.original.metrics[2].score)}></PieChart>
              <div className={getStatusLabelClass(row.original.metrics[2].score)}>
                Consistency
              </div>
            </Col>
            <Col sm="3" md="3" className="p-0">
              <PieChart input={transformToPieChartData(row.original.metrics[3].score)}></PieChart>
              <div className={getStatusLabelClass(row.original.metrics[3].score)}>
                Timeliness
              </div>
            </Col>
          </Row>
        )
      },
    ];

    const entitiesColumns = [
      {
        Header: "Data Subject",
        accessor: "subjectArea",
        // maxWidth: 150,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Data Concepts",
        accessor: "dataConcept",
        // maxWidth: 200,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Data Elements",
        accessor: "dataElement",
        // maxWidth: 200,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'flex-start' },
        headerClassName: 'table-header-bg',
      },
      {
        Header: "Score",
        accessor: "score",
        maxWidth: 90,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'flex-start' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div className={getStatusClass(parseInt(row.original.score))}>
            {parseInt(row.original.score)}
          </div>
        ),
      }
    ]

    return (
      <>
      <Container fluid className="main-content-container px-4 pb-4">
        <Card className="p-0">
            <CardHeader className="p-0">
              <Container fluid className="file-manager__filters border-bottom">
                <Row>
                 <Col className="file-manager__filters__rows d-flex" md="6">
                    <span>Shows </span>
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
                  <Col md="3"></Col>
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
                SubComponent={({original})=>{                
                  return (<Container fluid className="sub-component-container pt-4 pb-4">
                    <Row>
                      <Col md="9">
                        <div className="desc">Description:</div>
                        <div>{original.description}</div>
                      </Col>
                    </Row>
  
                  </Container>);
                }}
                
            />
            </div>
          </CardBody>
        </Card>
      </Container>
      
      {
        selectedDsa &&

        <Modal
          open={showScoreCardModal}
          toggle={togglePopupState}
          backdropClassName="blur-modal-backdrop" 
          size="lg" 
          keyboard={false}
        >
          <ModalHeader className="p-3">
            <Row>
              <Col md={11} sm={11}>
                <div className="modal-title"> 
                Scorecard - {selectedDsa.avgScore}
                </div>
              </Col>
              <Col md={1} sm={1} onClick={togglePopupState}>
                <span className="modal-close"> <i className="fas fa-times"></i></span>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="p-3">
            <ScoreCard data={selectedDsa} />
            <ReactTable
              columns={entitiesColumns}
              resizable={false}
              pageSize={pageSize}
              data={entitiesTableData.filter( d => d.subjectArea = selectedDsa.subjectArea )}
              showPageSizeOptions={false}
            />
          </ModalBody>
      </Modal>

      

      }
     </>
    )
  
}

export default DsaMain;
