import axios from "axios";

export const DailyBoxOffice = axios.create({
  baseURL:
    "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
  params: {
    key: process.env.REACT_APP_KOBIS_KEY
  }
});

export const PeopleInfo = axios.create({
  baseURL:
    "https://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?",
  params: {
    key: process.env.REACT_APP_KOBIS_KEY
  }
});

export const TmdbInfo = axios.create({
  baseURL: "https://api.themoviedb.org/",
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY
  }
});
