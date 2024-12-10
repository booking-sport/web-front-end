import React from "react";
import styled from "styled-components";
import Header from "@components/header/Header";
import Schedule from "@components/booking/Schedule";
// Styled Component
const Container = styled.div`
  overflow: auto;
`;

const Booking = () => {
  return (
    <Container>
      <Header />
      <Schedule />
    </Container>
  );
};

export default Booking;
