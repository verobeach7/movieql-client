import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  # getMovie는 적어도 되고 안 적어도 됨
  # argument gql 문법으로 삽입
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      # allMovies에서 이미 각 movie의 id와 title을 불러와 캐시해 놓았음
      # 나중에 GET_MOVIE 쿼리에 새로운 data(field)가 추가되면 기존 캐시에 새로운 데이터만 추가함
      medium_cover_image
      rating
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
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
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}
