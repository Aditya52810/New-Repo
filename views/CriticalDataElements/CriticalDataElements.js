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
  Button
} from "shards-react";
import { cda } from "../../services/CDEService";
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';

function CriticalDataElements () {
  const pageSizeOptions = [10, 15, 20, 25, 30];
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]); //eslint-disable-line react-hooks/exhaustive-deps

  const searchProp = "DataElement";
  const filterProps = {
    searchProp,
    searchColumn: "Critical Data Element",
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
    cda().then((res) => {
      if(res.status ===  200){
        let tblData = res.data.data;
        setData([...tblData]);
      }
    });
  },[]);

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  function getStatusClass(status) {
    if(status >= 90 ){
      return 'health-score-badge bg-success';
    }else if(status >= 70 && status < 90){
      return 'health-score-badge bg-warning';
    }else{
      return 'health-score-badge bg-danger'
    }
  }

  function getDataElemTitle(dataelem){
    let title = '';
    switch(dataelem){
      case "SustainabilityRating":{
        title = "Measures the degree to which a company's economic value may be at risk driven by ESG issues.";
        break;
      }
      case "FundTotalDailyReturns": {
        title = "Total daily return is the daily percentage change in price including any dividends and capital gains";
        break;
      }
      case "NetAssetValue":{
        title = "Net Asset Value represents fund value on a specific date after subtracting liabilities from the total asset divided by number of shares outstanding.";
        break;
      }
      case "PortfolioShare": {
        title = "Share of investment portfolio to the aggregate portfolio by investment mandate";
        break;
      }default:{
      title = "";
      break;
      }
    }
    return title;
  }

  /**
   * Handles the page size change event.
   */
  function handlePageSizeChange(e) {
    setPageSize(e.target.value);
  }

  /**
   * Mock method for editing transactions.
   */
  function handleItemEdit(row) {
    alert(`Editing transaction "${row.original.id}"!`);
  }


  /**
   * Mock method for confirming transactions.
   */
  function handleItemViewDetails(row) {
    alert(`Viewing details for "${row.original.subarea}"!`);
  }
    
    const tableColumns = [
      {
        Header: "Data Subject Area",
        accessor: "SubjectArea",
        maxWidth: 190,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'flex-start' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Data Concept",
        accessor: "DataConcept",
        maxWidth: 210,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg'
      },
      {
        Header: "Critical Data Element",
        accessor: "DataElement",
        maxWidth: 230,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'flex-start' },
        headerClassName: 'table-header-bg',
           Cell: row => (
             <div title={getDataElemTitle(row.original.DataElement)}>
                
                    {row.original.DataElement}
                
              </div>
              ),
      },
      {
        Header: "Health Score",
        accessor: "Score",
        maxWidth: 100,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
                <div className={getStatusClass(row.original.Score)}
                onClick={() => handleItemViewDetails(row)}>
                  {parseInt(row.original.Score)}
                </div>
              ),
      },
      {
        Header: "Feature/Importance",
        accessor: "Feature",
        maxWidth: 180,
       sortable: false,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div className="d-table mx-auto">
            <Button theme="white" onClick={() => handleItemEdit(row)}>
              View Details
              </Button>
            </div>
          )
      }, {
        // TODO: Check bg colors for buttons
        Header: "Anomaly Detection",
        accessor: "issues",
        maxWidth: 120,
        className: "text-left",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div className="d-table mx-auto">
          <Button onClick={() => handleItemEdit(row)}
            className={row.original.issues < 10 ? 'btn-info' : 
            ( row.original.issues > 30) ? 'btn-danger' : 'btn-warning'
            }
            style={{'color':'#fff'}}
          >
            {row.original.issues} Issues
            </Button>
          </div>
              ),
      },
     
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
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
                <Col md="3"></Col>
                <Col className="d-flex" md="3">
                  <TableFilter {...filterProps} />
                  {/* <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="fas fa-search"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={handleFilterSearch} />
                  </InputGroup> */}
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
            ></ReactTable>
            </div>
          </CardBody>
        </Card>
</Container>
    )
  
}

export default CriticalDataElements;
