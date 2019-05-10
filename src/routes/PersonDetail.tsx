import React from "react";
import PersonChart from "../components/PersonChart";
import { PeopleInfo as axios } from "../axios";

interface filmos {
  movieCd: string;
  movieNm: string;
}

interface Props {
  match: {
    params: {
      personId: string;
    };
  };
}

interface State {
  person: {
    peopleCd: string;
    peopleNm: string;
    peopleNmEn: string;
    sex: string;
    repRoleNm: string;
    filmos: filmos[];
  };
}

class PersonDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      person: {
        peopleCd: "",
        peopleNm: "",
        peopleNmEn: "",
        sex: "",
        repRoleNm: "",
        filmos: []
      }
    };
  }

  getResult = async () => {
    const {
      data: { peopleInfoResult }
    } = await axios.get("", {
      params: {
        peopleCd: this.props.match.params.personId
      }
    });

    const { peopleInfo: peopleInfo } = peopleInfoResult;
    this.setState({ person: peopleInfo });
  };

  componentDidMount = () => {
    this.getResult();
  };

  render() {
    let movieCnt = this.state.person.filmos.length;
    return (
      <React.Fragment>
        <div>{this.state.person.peopleNm}</div>
        <div>{this.state.person.filmos.map(filmo => `${filmo.movieNm}, `)}</div>
        <PersonChart movieCnt={movieCnt} />
      </React.Fragment>
    );
  }
}

export default PersonDetail;
