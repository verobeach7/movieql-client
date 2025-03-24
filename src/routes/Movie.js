import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  # getMovie는 적어도 되고 안 적어도 됨
  # argument gql 문법으로 삽입
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      # allMovies에서 이미 각 movie의 id와 title을 불러와 캐시해 놓았음
      # 나중에 GET_MOVIE 쿼리에 새로운 data(field)가 추가되면 기존 캐시에 새로운 데이터만 추가함
      small_cover_image
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  // 쿼리 호출 시는 GET_MOVIE로 접근
  const { data, loading } = useQuery(GET_MOVIE, {
    // 변수 전달
    variables: {
      movieId: id,
    },
  });
  console.log(data, loading);
  if (loading) {
    return <h1>Fetching movie...</h1>;
  }
  if (!data) {
    return <h1>Undefined</h1>;
  }
  // 쿼리로 반환된 data는 gql 문법으로 작성된 쿼리 내의 이름(movie)을 사용
  return <div>{data.movie.title}</div>;
}
