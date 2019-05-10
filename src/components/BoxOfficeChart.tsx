import React from "react";
import { endgameRecords } from "../static/endgame";
// import UsRecords from "../static/어스.json";
import bb from "billboard.js";

interface Props {}
interface State {
  boxOffice: any;
}

class BoxOfficeCharts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      boxOffice: null
    };
  }

  componentDidMount = () => {
    this.renderChart();
  };

  renderChart = () => {
    bb.generate({
      bindto: "#boxOfficeChart",
      data: {
        x: "date",
        json: endgameRecords,
        axes: {
          rank: "y"
        },
        types: {
          rank: "line"
        }
      },
      axis: {
        y: {
          inverted: true
        },
        x: {
          type: "timeseries"
        }
      }
    });
  };

  render() {
    return <div id="boxOfficeChart" />;
  }
}

export default BoxOfficeCharts;
