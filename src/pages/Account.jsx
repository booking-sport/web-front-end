import React from "react";
import styled from "styled-components";
import Header from "@components/header/Header";
import AccountContent from "@components/account/AccountContent";
// Styled Component
const Container = styled.div`
  overflow: auto;
`;

const Account = ({ user }) => {
  return (
    <Container>
      <Header user={user} />
      <AccountContent />
    </Container>
  );
};

export default Account;
