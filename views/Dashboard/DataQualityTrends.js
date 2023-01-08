import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

//import RangeDatePicker from "../common/RangeDatePicker";

// import colors from "../../utils/colors";
// import Chart from "../../utils/chart";

import {
  LineChart,
	Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import colors  from "../../utils/colors";

class DataQualityTrends extends React.Component {
  constructor(props) {
    super(props);

    this.legendRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // const chartOptions = {
    //   ...{
    //     responsive: true,
    //     legend: false,
    //     elements: {
    //       line: {
    //         // A higher value makes the line look skewed at this ratio.
    //         tension: 0.38
    //       }
    //     },
    //     scales: {
    //       xAxes: [
    //         {
    //           gridLines: false,
    //           ticks: {
    //             callback(tick, index) {
    //               return index % 2 === 0 ? "" : tick;
    //             }
    //           }
    //         }
    //       ],
    //       yAxes: [
    //         {
    //           ticks: {
    //             suggestedMax: 45
    //           }
    //         }
    //       ]
    //     },
    //     tooltips: {
    //       enabled: false,
    //       mode: "index",
    //       position: "nearest"
    //     }
    //   },
    //   ...this.props.chartOptions
    // };

    // const AnalyticsOverviewChart = new Chart(this.canvasRef.current, {
    //   type: "line",
    //   data: this.props.chartData,
    //   options: chartOptions
    // });

    // // Generate the analytics overview chart labels.
    // this.legendRef.current.innerHTML = AnalyticsOverviewChart.generateLegend();

    // // Hide initially the first and last analytics overview chart points.
    // // They can still be triggered on hover.
    // const meta = AnalyticsOverviewChart.getDatasetMeta(0);
    // meta.data[0]._model.radius = 0;
    // meta.data[
    //   this.props.chartData.datasets[0].data.length - 1
    // ]._model.radius = 0;

    // // Render the chart.
    // AnalyticsOverviewChart.render();
  }

  render() {
    const {  data } = this.props;

    return (
      <Card small className="h-100 mx-2 mt-3">
        {/* Card Header */}
        <CardHeader className="border-bottom bg-light">
          Aggregated Data Quality Score
        </CardHeader>

        <CardBody className="pt-3" >
          <ResponsiveContainer height={500} width="99%" className="pb-3">
            <LineChart data={data}>
              <Line type="monotone" dataKey="score" stroke="#005fb8" dot={false}/>
              <XAxis dataKey="date" hide={true} />
              <YAxis domain={[0, 100]}/>
              {/*<CartesianGrid strokeDasharray="5 5" />*/}
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>

          {/* <div ref={this.legendRef} /> */}
         
        </CardBody>
      </Card>
    );
  }
}

DataQualityTrends.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The Chart.js data.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js config options.
   */
  chartOptions: PropTypes.object
};

DataQualityTrends.defaultProps = {
  title: "Data Quality Trend",
  chartData: {
    labels: [
      "2021-09-07",
      "2021-09-08",
      "2021-09-09",
      "2021-09-10",
      "2021-09-11",
      "2021-09-12",
      "2021-09-13",
      "2021-09-14",
    ],
    datasets: [
      {
        label: "Source",
        fill: false,
        data: [85,89,87,90,94,92,88,90],
        backgroundColor: colors.primary.toRGBA(0.1),
        borderColor: colors.primary.toRGBA(1),
        pointBackgroundColor: colors.white.toHex(),
        pointHoverBackgroundColor: colors.primary.toRGBA(1),
        borderWidth: 1.5,
        lineTension: 0,
      }
      // {
      //   label: "Data Lake",
      //   fill: false,
      //   data: [88,89,87,90,94,86,92,88],
      //   backgroundColor: colors.salmon.toRGBA(0.1),
      //   borderColor: colors.salmon.toRGBA(1),
      //   pointBackgroundColor: colors.white.toHex(),
      //   pointHoverBackgroundColor: colors.salmon.toRGBA(1),
      //   borderWidth: 1.5,
      //   lineTension: 0,
      // },
      // {
      //   label: "Publication",
      //   fill: false,
      //   data: [95,94,93,85,86,95,87,88],
      //   backgroundColor: colors.yellow.toRGBA(0.1),
      //   borderColor: colors.yellow.toRGBA(1),
      //   pointBackgroundColor: colors.white.toHex(),
      //   pointHoverBackgroundColor: colors.yellow.toRGBA(1),
      //   borderWidth: 1.5,
      //   lineTension: 0,
      // },
      // {
      //   label: "Mean DQ Score",
      //   fill: false,
      //   data: [92,92,91,91,92,92,91,91],
      //   backgroundColor: colors.java.toRGBA(0.1),
      //   borderColor: colors.java.toRGBA(1),
      //   pointBackgroundColor: colors.java.toHex(),
      //   pointHoverBackgroundColor: colors.java.toRGBA(1),
      //   borderWidth: 1.5,
      //   lineTension: 0,
      // },
    ]
  }
};

export default DataQualityTrends;
