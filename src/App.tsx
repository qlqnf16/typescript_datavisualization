import React, { useState, useEffect } from "react";
import "./App.css";
import moment from "moment";
import axios from "./axios";

import chart from "billboard.js";
import "billboard.js/dist/billboard.css";

import Filter from "./components/Filter";

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

class App extends React.Component<Props, State> {
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

    const { dailyBoxOfficeList: boxOfficeList } = boxOfficeResult;
    this.setState({ boxOfficeList });
  };

  componentDidMount = async () => {
    console.log("componentDidMount");
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
    if (date != null) {
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

export default App;
