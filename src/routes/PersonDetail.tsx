import React from "react";
import PersonChart from "../components/PersonChart";
import { PeopleInfo as kobis, TmdbInfo as tmdb } from "../axios";

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
  personId: number;
  person: {
    peopleCd: string;
    peopleNm: string;
    peopleNmEn: string;
    sex: string;
    repRoleNm: string;
    filmos: filmos[];
  };
  personTMDB: {
    birthday: string | null;
    deathday: null | string;
    popularity: number;
  };
}

class PersonDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      personId: 0,
      person: {
        peopleCd: "",
        peopleNm: "",
        peopleNmEn: "",
        sex: "",
        repRoleNm: "",
        filmos: []
      },
      personTMDB: {
        birthday: null,
        deathday: null,
        popularity: 0
      }
    };
  }

  getKobisResult = async () => {
    const {
      data: { peopleInfoResult }
    } = await kobis.get("", {
      params: {
        peopleCd: this.props.match.params.personId
      }
    });

    const { peopleInfo: peopleInfo } = peopleInfoResult;
    this.setState({ person: peopleInfo });
  };

  getTmdbResult = async () => {
    const personId = this.props.match.params.personId;
    let person_id;
    switch (personId) {
      case "10087253":
        person_id = 75913;
      case "10019065":
        person_id = 227638;
      case "10054128":
        person_id = 84996;
      case "10030016":
        person_id = 21688;

      default:
        break;
    }
    const { data: result } = await tmdb.get(`3/person/${person_id}`);
    this.setState({ personTMDB: result });
  };

  componentDidMount = () => {
    this.getKobisResult();
    this.getTmdbResult();
  };

  render() {
    let movieCnt = this.state.person.filmos.length;
    return (
      <React.Fragment>
        <div>{this.state.person.peopleNm}</div>
        <div>{this.state.personTMDB.birthday}</div>
        <div>{this.state.person.filmos.map(filmo => `${filmo.movieNm}, `)}</div>
        <div>{this.state.personTMDB.popularity}</div>
        <PersonChart
          movieCnt={movieCnt}
          popularity={this.state.personTMDB.popularity}
        />
      </React.Fragment>
    );
  }
}

export default PersonDetail;
