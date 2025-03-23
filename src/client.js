import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// client가 GraphQL 백엔드 서버와 잘 연결됐는지 확인하는 작업
// Apollo Client의 Hook을 사용하지 않고도 확인 작업을 해볼 수 있음
// index.js에서 여기서 생성한 client를 import하기 때문에 아래 코드가 실행됨
client
  .query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `,
  })
  .then((data) => console.log(data));

export default client;
