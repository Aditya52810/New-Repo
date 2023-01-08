import React from 'react';
import { Container, Row, Col } from "shards-react";
import SmallStats from "./SmallStats";
import {
  NavLink,
} from "shards-react";
import { Link } from "react-router-dom";
import { count } from '../../services';

class TopCards extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cards :   [
        {
          label: "Data Subject Areas",
          id: "dsaScore",
          // value: 0,
          // percentage: "12.4%",
          // increase: true,
          // chartLabels: [null, null, null, null, null],
          // decrease: false,
          // datasets: [
          //   {
          //     label: "Today",
          //     fill: "start",
          //     borderWidth: 1.5,
          //     backgroundColor: colors.primary.toRGBA(0.1),
          //     borderColor: colors.primary.toRGBA(),
          //     data: [3, 5, 7, 9, 2]
          //   }
          // ],
          route:'/dsa',
        },
        {
          label: "Profiled Data Entities",
          // value: 0,
          id: "pdeScore",
          // percentage: "7.21%",
          // increase: true,
          // chartLabels: [null, null, null, null, null],
          // decrease: true,
          // datasets: [
          //   {
          //     label: "Today",
          //     fill: "start",
          //     borderWidth: 1.5,
          //     backgroundColor: colors.success.toRGBA(0.1),
          //     borderColor: colors.success.toRGBA(),
          //     data: [2.9, 4, 4, 7, 9]
          //   }
          // ],
          route:'/pde',
        },
        // {
        //   label: "DQ Suggestions",
        //   // value: 0,
        //   id: "numSuggestions",
        //   // percentage: "3.71%",
        //   // increase: true,
        //   // chartLabels: [null, null, null, null, null],
        //   // decrease: false,
        //   // datasets: [
        //   //   {
        //   //     label: "Today",
        //   //     fill: "start",
        //   //     borderWidth: 1.5,
        //   //     backgroundColor: colors.warning.toRGBA(0.1),
        //   //     borderColor: colors.warning.toRGBA(),
        //   //     data: [6, 6, 7, 8, 9]
        //   //   }
        //   // ],
        //   route:'/suggestions',
        // },
        {
          label: "DQ Findings",
          // value: 0,
          id: "dqfindingScore",
          // percentage: "2.71%",
          // increase: false,
          // chartLabels: [null, null, null, null, null],
          // decrease: true,
          // datasets: [
          //   {
          //     label: "Today",
          //     fill: "start",
          //     borderWidth: 1.5,
          //     backgroundColor: colors.salmon.toRGBA(0.1),
          //     borderColor: colors.salmon.toRGBA(),
          //     data: [9, 7, 6, 5, 5]
          //   }
          // ],
          route:'/dqfinding',
         }
      ]
    }
  }

  componentDidMount(){
    count().then((res) => {
      if(res.status ===  200) {
        let score = res.data;
        let newCards = this.state.cards;
        for(let k in score) {
          newCards.forEach( (x) => {
            if( x.id === k ) {
              x.value = score[k];
            }
          })
        }
        this.setState({cards: newCards})
      }
    }).catch( err => {
      console.log(err)
    })
  }

  render(){
    // const cards = this.state;

    const { title } = this.props;

    return(
  
    <Container fluid>
      <Row>
      
        {this.state.cards.map( (stats, idx) => (   
          <Col className="col-lg" md="6" sm="6" key={idx}>
            <NavLink tag={Link} to={stats.route} className="nav-link-card">
              <SmallStats
                id={`small-stats-${idx}`}
                // variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
                title={title}
              />
            </NavLink>
          </Col>
          )
        )
      }
     
      </Row>
    </Container>
    )
  }
}
  
export default TopCards;
