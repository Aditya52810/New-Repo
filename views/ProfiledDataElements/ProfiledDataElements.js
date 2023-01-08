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
} from "shards-react";
import PieChart from "../../Common/PieChart";
//import '../Common/table.scss';
import colors from "../../utils/colors";
import { getpdeSumm } from "../../services/PDEService";
import TableFilter from "../../components/common/TableFilter";
import _debounce from 'lodash/debounce';

function PdeMain() {
  const pageSizeOptions =  [5, 10, 15, 20, 25, 30];
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchCallback(filteredData){    
    setSearchFilter(filteredData);
  }
  const debounceFn = useCallback(_debounce(handleSearchCallback, 500),[]); //eslint-disable-line react-hooks/exhaustive-deps
  const searchProp = "dataElement";
  const filterProps = {
    searchProp,
    searchColumn: "Data Elements",

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
    getpdeSumm().then((res) => {
      if(res.status ===  200){
        let tblData = res.data.data;
        setData(tblData);       
    
        // Initialize the fuzzy searcher.
        // searcher = new FuzzySearch(tableData, ["SubjectArea"], {
        //   caseSensitive: false
        // });
      }
    });
  },[]);


  

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  function getStatusClass(status) {
    if(status >= 90 ){
      return 'health-score-badge bg-success-teal';
    }else if(status >= 70 && status < 90){
      return 'health-score-badge bg-warning-yellow';
    }else{
      return 'health-score-badge bg-danger-brown'
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
      }
      default:{
        title = "";
        break;
      }
    }
    return title;
  }

  function transformToPieChartData(input){
    let value = parseInt(input);
    // if (isNaN(value)) value = 'N/A'
    const dataset = 100 - value;

    let color = colors.primary.toRGBA(0.9);

    if(value >= 90){
      color = colors.success.toRGBA(0.9);
    }else if(value >= 70 & value < 90){
      color = colors.warning.toRGBA(0.9);
    }else{
      color = colors.danger.toRGBA(0.9);
    }

    return  {
      //title: "Newsletter Signups",
      //completions: "291",
      value: value,
      //conversionRate: "57.2%",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [value,dataset],
            backgroundColor: [
              color,
              colors.athensGray.toRGBA(0.8)
            ]
          }
        ],
      //  labels: ["Label 1", "Label 2"]
      }
    }
  }

  /**
   * Handles the page size change event.
   */
  function handlePageSizeChange(e) {
    setPageSize(e.target.value);
  }

    const tableColumns = [
      // {
      //   Header: "#",
      //   accessor: "Id",
      //   maxWidth: 60,
      //   className: "text-center",
      //   style: { 'whiteSpace': 'unset' },
      //   headerClassName: 'table-header-bg'
      // },
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
        accessor: "DataElement",
        // maxWidth: 200,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'flex-start' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div title={getDataElemTitle(row.original.dataElement)}>
            <div>
              {row.original.dataElement}
            </div>
          </div>
          ),
      },
      {
        Header: "Score",
        accessor: "score",
        maxWidth: 100,
        className: "text-left",
        style: { 'whiteSpace': 'unset', 'justifyContent': 'flex-start' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div className={getStatusClass(parseInt(row.original.score))}>
            {parseInt(row.original.score)}
          </div>
        ),
      },
      {
        Header: "Timeliness",
        accessor: "Timeliness",
        maxWidth: 150,
        className:"text-center",
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
          <div className="d-flex justify-content-center">
          { row.original.timeliness ? 
            <PieChart input={transformToPieChartData(row.original.timeliness)}></PieChart>
            :
            "N/A"
          }
          </div>
        )
      },
      {
        Header: "Accuracy/Validity",
        accessor: "Accuracy",
        maxWidth: 150,
        style: { 'whiteSpace': 'unset'},
        headerClassName: 'table-header-bg',
        Cell: row => (
            <div className="d-flex justify-content-center" >
            { row.original.accuracy ? 
              <PieChart input={transformToPieChartData(row.original.accuracy)}></PieChart>
              :
              "N/A"
            }
            </div>
        )
      },
      {
        Header: "Completeness",
        accessor: "Completeness",
        maxWidth: 150,
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
            <div className="d-flex justify-content-center">
            { row.original.completeness ? 
              <PieChart input={transformToPieChartData(row.original.completeness)}></PieChart>
              :
              "N/A"
            }
            </div>
        )
      },
      {
        Header: "Consistency",
        accessor: "Consistency",
        maxWidth: 150,
        style: { 'whiteSpace': 'unset' },
        headerClassName: 'table-header-bg',
        Cell: row => (
            <div className="d-flex justify-content-center">
            { row.original.consistency ? 
              <PieChart input={transformToPieChartData(row.original.consistency)} />
              :
              "N/A"
            }
            </div>
        )
      }
      // -----------------------------------------------------------------------------
    //   {
    //     Header: "Date",
    //     accessor: "date",
    //     className: "text-center",
    //     minWidth: 200,
    //     Cell: row =>
    //       (new Date(row.original.date))//, "dddd, mmmm dS, yyyy")
    //   },
    //   {
    //     Header: "Customer",
    //     accessor: "customer",
    //     className: "text-center"
    //   },
    //   {
    //     Header: "Products",
    //     accessor: "products",
    //     maxWidth: 100,
    //     className: "text-center"
    //   },
    //   {
    //     Header: "Status",
    //     accessor: "status",
    //     maxWidth: 100,
    //     Cell: row => (
    //       <span className={getStatusClass(row.original.status)}>
    //         {row.original.status}
    //       </span>
    //     ),
    //     className: "text-center"
    //   },
    //   {
    //     Header: "Total",
    //     accessor: "total",
    //     maxWidth: 100,
    //     Cell: row => <span className="text-success">{row.original.total}</span>,
    //     className: "text-center"
    //   },
    //   {
    //     Header: "Actions",
    //     accessor: "actions",
    //     maxWidth: 300,
    //     minWidth: 180,
    //     sortable: false,
    //     Cell: row => (
    //       <ButtonGroup size="sm" className="d-table mx-auto">
    //         <Button theme="white" onClick={() => handleItemConfirm(row)}>
    //           <i className="material-icons">&#xE5CA;</i>
    //         </Button>
    //         <Button
    //           theme="white"
    //           onClick={() => handleItemViewDetails(row)}
    //         >
    //           <i className="material-icons">&#xE870;</i>
    //         </Button>
    //         <Button theme="white" onClick={() => handleItemEdit(row)}>
    //           <i className="material-icons">&#xE254;</i>
    //         </Button>
    //         <Button theme="white" onClick={() => handleItemDelete(row)}>
    //           <i className="material-icons">&#xE872;</i>
    //         </Button>
    //       </ButtonGroup>
    //     )
    //   }
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

export default PdeMain;
