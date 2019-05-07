import React, { useState, useEffect } from "react";
import "./App.css";
import moment from "moment";
import axios from "./axios";

import Filter from "./components/Filter";

interface boxOfficeRes {
  rank: string;
  movieNm: string;
  movieCd: string;
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

  componentDidMount = () => {
    this.getResult();
  };

  changeDate = (e: any) => {
    let newDate = moment(e.target.value, "YYYY-MM-DD").format("YYYYMMDD");
    this.setState({ targetDt: newDate });
    this.getResult();
  };

  render() {
    return (
      <div>
        <Filter
          today={today}
          changeDate={this.changeDate}
          defaultValue={moment(this.state.targetDt, "YYYYMMDD").format(
            "YYYY-MM-DD"
          )}
        />
        {this.state.boxOfficeList.map(boxOffice => (
          <div key={boxOffice.movieCd}>
            <div>{boxOffice.rank}</div>
            <div>{boxOffice.movieNm}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
