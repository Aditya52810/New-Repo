import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Card, CardBody } from "shards-react";

import Chart from "../../utils/chart";

class SmallStats extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {

    if(this.props.chartData.length > 0){
      const chartOptions = {
        ...{
          maintainAspectRatio: true,
          responsive: true,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
            custom: false
          },
          elements: {
            point: {
              radius: 0
            },
            line: {
              tension: 0.33
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: false,
                scaleLabel: false,
                ticks: {
                  display: false,
                  isplay: false,
                  // Avoid getting the graph line cut of at the top of the canvas.
                  // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                  suggestedMax: Math.max(...this.props.chartData[0].data) + 1
                }
              }
            ]
          }
        },
        ...this.props.chartOptions
      };
  
      const chartConfig = {
        ...{
          type: "line",
          data: {
            ...{
              labels: this.props.chartLabels
            },
            ...{
              datasets: this.props.chartData
            }
          },
          options: chartOptions
        },
        ...this.props.chartConfig
      };
  
      new Chart(this.canvasRef.current, chartConfig);
    }

    
  }

  render() {
    const { variation, label, value,  title } = this.props;

    const active = title === label

    const cardClasses = classNames(
      "stats-small",
      variation && `stats-small--${variation}`,
      active ? "stats-small__active " : null
    );

    const cardBodyClasses = classNames(
      variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
    );

    const innerWrapperClasses = classNames(
      "d-flex",
      variation === "1" ? "flex-column m-auto" : "px-3"
    );

    const dataFieldClasses = classNames(
      "stats-small__data",
      "w-100",
      variation === "1" && "text-center",
      active ? "text-primary" : null
    );

    const labelClasses = classNames(
      "stats-small__label",
      "text-uppercase",
      variation !== "1" && "mb-1",
      active ? "text-primary" : null
    );

    const valueClasses = classNames(
      "stats-small__value",
      "count",
      variation === "1" ? "my-3" : "m-0",
      active ? "text-primary" : null
    );
    

    return (
      <Card small className={cardClasses}>
        <CardBody className={cardBodyClasses}>
          <div className={innerWrapperClasses}>
            <div className={dataFieldClasses}>
              <span className={labelClasses}>{label}</span>
              <h6 className={valueClasses}>{value}</h6>
            </div>
            {/*<div className={innerDataFieldClasses}>
              <span className={percentageClasses}>{percentage}</span>
            </div>*/}
          </div>
          {
            // cardHasChart &&
            // <canvas
            //   height={canvasHeight}
            //   ref={this.canvasRef}
            //   className={`stats-small-${shortid()}`}
            // />
          }
        </CardBody>
      </Card>
    );
  }
}

SmallStats.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
   percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // /**
  //  * Whether is a value increase, or not.
  //  */
   increase: PropTypes.bool,
  // /**
  //  * The Chart.js configuration object.
  //  */
   chartConfig: PropTypes.object,
  // /**
  //  * The Chart.js options object.
  //  */
   chartOptions: PropTypes.object,
  // /**
  //  * The chart data.
  //  */
   chartData: PropTypes.array.isRequired,
  // /**
  //  * The chart labels.
  //  */
   chartLabels: PropTypes.array
};

SmallStats.defaultProps = {
  increase: true,
  percentage: 0,
  value: 0,
  label: "Label",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
  chartData: [],
  chartLabels: []
};

export default SmallStats;
