import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import client from "./client";
import { ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

// ApolloProvider로 감싸주면 React Components, Router, Screen을 연결해주게 됨
// 즉, Provider는 애플리케이션 안의 모두가 이 client에 접근할 수 있게 해주는 것
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
