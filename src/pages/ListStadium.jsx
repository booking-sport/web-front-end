import Header from "@components/header/Header";
import ListContent from "@components/list-stadium/ListContent";
import React from "react";
import styled from "styled-components";
// Styled Component
const Container = styled.div``;
const ListStadium = ({ user }) => {
  return (
    <Container>
      <Header user={user} />
      <ListContent />
    </Container>
  );
};
export default ListStadium;
