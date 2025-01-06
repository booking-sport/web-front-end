import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "@components/header/Header";
import AccountContent from "@components/account/AccountContent";
// Styled Component
const Container = styled.div`
  overflow: auto;
`;

const Account = ({ user }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        window.location.href = "/login";
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [user]);
  return (
    <Container>
      <Header user={user} />
      <AccountContent />
    </Container>
  );
};

export default Account;
