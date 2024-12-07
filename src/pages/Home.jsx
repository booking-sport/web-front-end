import React from "react";
import styled from "styled-components";
import Header from "@components/header/Header";
import Map from "@components/map/Map";
// Styled Component
const Container = styled.div`
  overflow: auto;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <Map />
    </Container>
  );
};

export default Home;
