import React from 'react';
import { Container, Row, Col } from "shards-react";
import SmallStats from "../../components/common/SmallStats";
import colors from "../../utils/colors";
import DataQualityTrends from "./DataQualityTrends";
import './dashboard.scss';




import { score, healthTrend } from '../../services';
import TopCards from '../../components/common/TopCards';

class Dashboard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dataQualityScoreCards: [
        {
          label: "Today",
          id: "avgscoretoday",
          value: "68",
          percentage: "2%",
          increase: true,
          chartLabels: [null, null, null, null, null],
          
          decrease: false,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.tealHigh.toRGBA(0.1),
              borderColor: colors.tealHigh.toRGBA(),
              data: [9, 3, 3, 9, 9]
            }
          ]
        },
        {
          label: "Last 7 Days",
          value: "0",
          id: "avgscorepastweek",
          percentage: "-1%",
          increase: false,
          chartLabels: [null, null, null, null, null],
          decrease: true,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.tealHigh.toRGBA(0.1),
              borderColor: colors.tealHigh.toRGBA(),
              backgroundColor:"green",
              data: [3.9, 4, 4, 9, 4]
            }
          ]
        },
        {
          label: "This Month",
          value: "0",
          id: "avgscorepastmonth",
          percentage: "7%",
          increase: true,
          chartLabels: [null, null, null, null, null],
          decrease: false,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.yellowMed.toRGBA(0.1),
              borderColor: colors.yellowMed.toRGBA(),
              data: [6, 6, 9, 3, 3]
            }
          ]
        },
      ],
      trendData: [],
    }
  }

  componentDidMount(){
    score().then((res) => {

      if(res.status ===  200){
        let score = res.data;
        let newCards = this.state.dataQualityScoreCards;

        for(let k in score){
          newCards.forEach((x) => {
            if(x.id === k){
              x.value = Math.round(score[k]);
            }
          })
        }
       
        this.setState({cards :newCards})

      }

    })

    healthTrend().then( async res => {
      const raw = res.data.data

      const tableFormatted = await raw.reduce( (acc, curr) => {
        let score = parseInt(curr.success/curr.total * 100)

        if (score === 0) {
          if (acc.length > 0) 
            score = acc[acc.length-1].score
          else
            score = 100
        }
        const dateTime = new Date(curr.Execution_Date)
        let date = dateTime.toDateString()
        date = new Date(date)
        date = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`

        const formatDat = {
          ...curr,
          score,
	  date
        }
        acc.push(formatDat)
        return acc
      } , [])
      this.setState({
        trendData: tableFormatted
      })
    })
  }

  render() {
    const { trendData } = this.state;

    return (<>
      <Container>
        <Row>
              <TopCards title="hello" />
            </Row>
      </Container>
      <Container fluid>
      <Row>  
        <Col md="12" lg="9">
          <div>
            {/*<h4 className="text-sm-left mb-3 page-subtitle">Data Quality Trend</h4>*/}
          </div>
          <div>
            <DataQualityTrends data={trendData} />
          </div>
        </Col>

        

        <Col md="6" lg="3">
          <div>
            <label className="text-sm-left my-3 ml-4 mr-2"><b>Data Quality Metrics</b></label>
            {
              this.state.dataQualityScoreCards.map( (stats, idx) => (
                <Col key={idx} md="12" lg="12" className="mb-4 small-size-card">
                  <SmallStats
                    id={`small-stats-${idx}`}
                    // chartData={stats.datasets}
                    // chartLabels={stats.chartLabels}
                    label={stats.label}
                    value={stats.value}
                    percentage={stats.percentage}
                    increase={stats.increase}
                    decrease={stats.decrease}
                    // variation="1"
                  />
                </Col>
                )
              )
            }
          </div>
        </Col>
      </Row>
    </Container>
    </>)
  }
}


export default Dashboard;
