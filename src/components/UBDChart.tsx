import React from "react";
import bb from "billboard.js";

interface boxOfficeRes {
  rank: string;
  movieNm: string;
  movieCd: string;
  salesAcc: string;
  audiAcc: string;
}

interface Props {
  boxOfficeList: any[];
}

interface State {}

class UBDCHart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevProps !== this.props) {
      this.renderChart();
    }
  };

  renderChart = () => {
    bb.generate({
      bindto: "#UBDChart",
      data: {
        columns: [this.props.boxOfficeList],
        type: "bubble",
        labels: true
      },
      bubble: {
        maxR: x => 50
      },
      axis: {
        x: {
          type: "category"
        },
        y: {
          max: 10
        }
      }
    });
  };

  render() {
    const { chartContainerStyle } = styles;
    return <div id="UBDChart" style={chartContainerStyle} />;
  }
}

const styles = {
  chartContainerStyle: {
    width: "75%",
    margin: "0 auto"
  }
};

export default UBDCHart;
