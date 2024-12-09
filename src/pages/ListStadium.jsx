import Header from "@components/header/Header";
import ListContent from "@components/list-stadium/ListContent";
import React from "react";
import styled from "styled-components";
// Styled Component
const Container = styled.div``;
const ListStadium = () => {
  return (
    <Container>
      <Header />
      <ListContent />
    </Container>
  );
};
export default ListStadium;
