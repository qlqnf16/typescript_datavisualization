import React from "react";
import bb from "billboard.js";
import "billboard.js/dist/theme/insight.css";

interface Props {
  movieCnt: number;
  popularity: number;
}

interface State {
  audieAcc: number;
  avgRate: number;
  searchCnt: number;
  avgUBDD: number;
}

class PersonChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      audieAcc: 5,
      avgRate: 3.9,
      searchCnt: 4.6,
      avgUBDD: 5
    };
  }

  componentDidMount = () => {
    this._renderChart();
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevProps !== this.props) {
      this._renderChart();
    }
  };

  _renderChart() {
    let popularity = this.props.popularity;
    if (popularity <= 20) popularity = 1;
    else if (popularity > 20 && popularity <= 40) popularity = 2;
    else if (popularity > 40 && popularity <= 60) popularity = 3;
    else if (popularity > 60 && popularity <= 80) popularity = 4;
    else popularity = 5;

    let chart = bb.generate({
      bindto: "#personStat",
      data: {
        x: "x",
        columns: [
          ["x", "관객수", "영화편수", "평균평점", "인기도", "평균 UBDD"],
          [
            "data1",
            this.state.audieAcc,
            this.props.movieCnt / 10,
            this.state.avgRate,
            popularity,
            this.state.avgUBDD
          ]
        ],
        type: "radar",
        labels: true,
        colors: { data1: "#db6866" }
      },
      radar: {
        axis: {
          level: {
            depth: 5
          },
          direction: {
            clockwise: true
          }
        }
      },
      tooltip: {
        format: {
          name: x => ""
        }
      }
    });

    return chart;
  }

  render() {
    return (
      <React.Fragment>
        <div>{this.props.movieCnt}</div>
        <div id="personStat" />
      </React.Fragment>
    );
  }
}

export default PersonChart;
