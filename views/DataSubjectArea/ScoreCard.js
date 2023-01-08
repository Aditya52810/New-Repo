import React from "react";
import { Container, Row, Col } from "shards-react";


class ScoreCard extends React.Component{


  render(){
    const { data } = this.props
    return(
      <>
        <Container>
{/*          <Row>
            <Col md={6} sm={6}>
              Overall DQ Score : {data.healthscore}
            </Col>
            <Col md={6} sm={6}>
              Show dropdowns here
            </Col>
          </Row>*/}
          <Row>
            <Col md={6} sm={6}>
              Total Data Elements : {data.sumDataElements}
            </Col>
            <Col md={6} sm={6}>
              Critical: {data.cdes}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default ScoreCard;
