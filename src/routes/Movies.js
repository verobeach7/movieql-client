import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  // ApolloProvider를 통해 client.js에서 생성해 놓은 백엔드와 연결됨
  const client = useApolloClient();
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then((results) => setMovies(results.data.allMovies));
  }, [client]);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

/* 
 useApolloClient를 모든 파일에서 Provider를 통해서 접근하는 것은 반복적인 작업을 계속 해야 하기 때문에 매우 성가심.
 - client.query, GraphQL Query를 반복적으로 작업
 - 결과를 받아와서 state 안에 저장
 - state를 계속해서 만들고 state의 이름을 다 기억해야 됨
 - REST API를 이용하여 fetch해오고 받은 데이터를 다시 처리해야 된다는 점이 꼭 닮아 있음
*/
