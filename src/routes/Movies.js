import { gql, useQuery } from "@apollo/client";

const ALL_MOVIES = gql`
  # allMovies라고 해도 되고 getMovies라고 해도 potato라고 해도 됨. 아예 쓰지 않아도 상관 없음
  query getMovies {
    allMovies {
      id
      title
    }
  }
`;

export default function Movies() {
  // result에 무엇이 반환되어 들어오는지 확인
  // const result = useQuery(ALL_MOVIES);
  // console.log(result);

  // useQuery Hook은 Declarative code(선언형 코드)를 사용하게 해 줌
  // 선언형 코드는 원하는 것을 설명하기 위한 코드만 적는 것을 말함
  // 반면에 Imperative code(명령형 코드)는 모든 단계의 코드를 적는 것을 말함
  const { data, loading, error } = useQuery(ALL_MOVIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <ul>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
