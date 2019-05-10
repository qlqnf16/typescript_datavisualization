import React from "react";
import AvengersEndgameRecords from "../static/어벤저스_엔드게임.json";
import UsRecords from "../static/어스.json";

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

  // renderChart = () => {
  //     const { rank } = AvengersEndgameRecords;
  // }
}

export default BoxOfficeCharts;
