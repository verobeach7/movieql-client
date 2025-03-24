import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  # getMovie는 적어도 되고 안 적어도 됨
  # argument gql 문법으로 삽입
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
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
  return <div>{data.movie.title}</div>;
}
