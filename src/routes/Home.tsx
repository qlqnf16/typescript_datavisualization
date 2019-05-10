import React from "react";
import moment from "moment";
import { DailyBoxOffice as axios } from "../axios";
import { Link } from "react-router-dom";

import chart from "billboard.js";
import "billboard.js/dist/billboard.css";

import Filter from "../components/Filter";
import BoxOfficeCharts from "../components/BoxOfficeChart";

interface boxOfficeRes {
  rank: string;
  movieNm: string;
  movieCd: string;
  salesAcc: string;
  audiAcc: string;
}

interface Props {}

interface State {
  targetDt: string;
  boxOfficeList: boxOfficeRes[];
}

let today = moment()
  .subtract(1, "days")
  .format("YYYYMMDD");

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      targetDt: today,
      boxOfficeList: []
    };
  }

  getResult = async () => {
    const {
      data: { boxOfficeResult }
    } = await axios.get("", {
      params: {
        key: process.env.REACT_APP_KOBIS_KEY,
        targetDt: this.state.targetDt
      }
    });

    console.log(boxOfficeResult);

    const { dailyBoxOfficeList: boxOfficeList } = boxOfficeResult;
    this.setState({ boxOfficeList });
  };

  componentDidMount = async () => {
    await this.getResult();
    await this.renderChart();
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (this.state.targetDt != prevState.targetDt) {
      this.getResult();
      this.renderChart();
    }
  };

  changeDate = (date: any) => {
    if (date !== null) {
      this.setState({ targetDt: date.format("YYYYMMDD") });
    }
  };

  renderChart = () => {
    let salesAccColumn: any[] = ["누적매출"];
    let audiAccColumn: any[] = ["누적관객수"];
    let movies: string[] = [];

    this.state.boxOfficeList.map(result => {
      salesAccColumn.push(parseInt(result.salesAcc));
      audiAccColumn.push(parseInt(result.audiAcc));
      movies.push(result.movieNm);
    });

    chart.generate({
      bindto: "#myChart",
      data: {
        columns: [salesAccColumn, audiAccColumn],
        type: "bar",
        axes: {
          누적매출: "y",
          누적관객수: "y2"
        }
      },
      axis: {
        x: {
          type: "category",
          categories: movies
        },
        y2: {
          show: true
        }
      }
    });
  };

  render() {
    return (
      <div>
        <BoxOfficeCharts />
        <div>
          <div>dummy people</div>
          <Link to={`person/10087253`}>하정우</Link>
          <Link to={`person/10019065`}>류승룡</Link>
          <Link to={`person/10054128`}>유해진</Link>
          <Link to={`person/10030016`}>배두나</Link>
        </div>
        <Filter
          today={today}
          changeDate={this.changeDate}
          defaultValue={this.state.targetDt}
        />
        {this.state.boxOfficeList.map(boxOffice => (
          <div key={boxOffice.movieCd}>
            <div>{boxOffice.rank}</div>
            <div>{boxOffice.movieNm}</div>
            <div>{parseInt(boxOffice.salesAcc).toLocaleString()}원</div>
            <div>{parseInt(boxOffice.audiAcc).toLocaleString()}명</div>
          </div>
        ))}
        <div id="myChart" />
      </div>
    );
  }
}

export default Home;
