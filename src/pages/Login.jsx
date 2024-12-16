import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  TitleIcon,
  EyeIcon,
  FacebookIcon,
  GoogleIcon,
  ArrowLeftIcon,
} from "@components/icons/svg";

import { login } from "@components/services/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// Styled Component
const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  @media (max-width: 1200px) {
    justify-content: center;
  }
`;
const LeftContainer = styled.div`
  padding: 20px;
  width: 100%;
  flex: 1;
  @media (max-width: 1200px) {
    display: none;
  }
`;
const ImageBackground = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 1px solid #1d9a6c;
  border-radius: 16px;
`;
const RightContainer = styled.div`
  flex: 1;
  max-width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;
const MainContainer = styled.div`
  max-width: 552px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 1200px) {
    padding: 0 16px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const Title = styled.span`
  color: var(--text-primary, #111927);
  font-feature-settings:
    "liga" off,
    "clig" off;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const FormHeader = styled.div``;
const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const FormTitle = styled.p`
  margin: 0;
  color: var(--text-primary, #111927);
  font-feature-settings:
    "liga" off,
    "clig" off;
  font-family: "Plus Jakarta Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;
const FormSubTitle = styled.p`
  color: var(--text-secondary, #4d5761);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Typography/Body 2 */
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 157%;
  margin-top: 8px;
  margin-bottom: 0;
`;
const LinkToRegister = styled.a`
  color: var(--primary-main, #1d9a6c);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Typography/Subtitle 1 */
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%;
  text-decoration: none;
`;
const TitleField = styled.span`
  color: var(--text-secondary, #4d5761);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Components/Input Label */
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 109.091% */
  letter-spacing: 0.15px;
  position: absolute;
  top: 9px;
  left: 12px;
`;
const InputFieldContainer = styled.div`
  padding: 24px 12px 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--divider, #dfe4ec);
  position: relative;
  display: flex;
`;
const InputField = styled.input`
  color: var(--text-primary, #111927);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Components/Input Text */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.15px;
  width: 100%;
  border: 0;
  outline: none;
`;
const ShowButton = styled.button`
  background-color: transparent;
  outline: none;
  border: 0;
`;
const LoginButton = styled.button`
  outline: none;
  border: 0;
  border-radius: 60px;
  background: var(--primary-main, #1d9a6c);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 42px;
  color: var(--primary-contrast, #fff);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Components/Button Large */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
`;
const ForgetPass = styled.a`
  color: var(--primary-main, #1d9a6c);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Typography/Subtitle 2 */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%;
`;
const ButtonBack = styled.button`
  color: var(--text-primary, #111927);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Typography/Subtitle 2 */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: 0;
  outline: none;
  width: fit-content;
`;
const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const savedUser = localStorage.getItem("user");
    if (savedUser && !jwt) {
      localStorage.removeItem("user");
    } else if (savedUser && jwt) {
      navigate("/");
    }
  }, [navigate]);
  const handleClickLogin = () => {
    setIsLogin(true);
  };
  const handleClickRegister = () => {
    setIsLogin(false);
  };

  const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const [error, setError] = useState("");
    const toggleVisibility = () => {
      setIsHidden(!isHidden);
    };

    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleChangeEmail = (e) => {
      setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await login(username, password);
      if (result.success) {
        onLoginSuccess(result.user);
        window.location.href = "/";
      } else {
        setError(result.message);
      }
    };
    return (
      <FormContainer>
        <FormHeader>
          <FormTitle>Đăng nhập</FormTitle>
          <FormSubTitle>
            Bạn chưa có tài khoản?{" "}
            <LinkToRegister href="#" onClick={handleClickRegister}>
              Đăng ký ngay.
            </LinkToRegister>
          </FormSubTitle>
        </FormHeader>
        <FormContent onSubmit={handleSubmit}>
          <InputFieldContainer>
            <TitleField>Nhập số điện thoại hoặc email</TitleField>
            <InputField
              placeholder="Nhập số điện thoại hoặc email"
              type="text"
              onChange={handleChangeEmail}
            />
          </InputFieldContainer>
          <InputFieldContainer>
            <TitleField>Mật khẩu</TitleField>
            <InputField
              placeholder="Mật khẩu"
              type={isHidden ? "password" : "text"}
              onChange={handleChangePassword}
              id="password"
              value={password}
            />
            <ShowButton type="button" onClick={toggleVisibility}>
              <EyeIcon />
            </ShowButton>
          </InputFieldContainer>
          <LoginButton type="submit">Đăng nhập</LoginButton>
          <ForgetPass>Quên mật khẩu?</ForgetPass>
        </FormContent>
      </FormContainer>
    );
  };
  const RegisterForm = () => {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const [isRePassHidden, setIsRePassHidden] = useState(true);

    const toggleVisibility = () => {
      setIsHidden(!isHidden);
    };
    const toggleRePassVisibility = () => {
      setIsRePassHidden(!isRePassHidden);
    };

    const handleChange = (e) => {
      setPassword(e.target.value);
    };
    const handleRePassChange = (e) => {
      setRePassword(e.target.value);
    };
    return (
      <FormContainer>
        <ButtonBack onClick={handleClickLogin}>
          <ArrowLeftIcon />
          Quay lại
        </ButtonBack>
        <FormHeader>
          <FormTitle>Đăng ký</FormTitle>
          <FormSubTitle>
            Bạn đã có tài khoản?{" "}
            <LinkToRegister href="#" onClick={handleClickLogin}>
              Đăng nhập ngay.
            </LinkToRegister>
          </FormSubTitle>
        </FormHeader>
        <FormContent>
          <InputFieldContainer>
            <TitleField>Nhập số điện thoại hoặc email</TitleField>
            <InputField
              placeholder="Nhập số điện thoại hoặc email"
              type="text"
            />
          </InputFieldContainer>
          <InputFieldContainer>
            <TitleField>Họ và tên</TitleField>
            <InputField placeholder="Nhập họ và tên" type="text" />
          </InputFieldContainer>
          <InputFieldContainer>
            <TitleField>Mật khẩu</TitleField>
            <InputField
              placeholder="Mật khẩu"
              type={isHidden ? "password" : "text"}
              onChange={handleChange}
              id="password"
              value={password}
            />
            <ShowButton type="button" onClick={toggleVisibility}>
              <EyeIcon />
            </ShowButton>
          </InputFieldContainer>
          <InputFieldContainer>
            <TitleField>Nhập lại mật khẩu</TitleField>
            <InputField
              placeholder="Nhập lại mật khẩu"
              type={isRePassHidden ? "password" : "text"}
              onChange={handleRePassChange}
              id="password"
              value={rePassword}
            />
            <ShowButton type="button" onClick={toggleRePassVisibility}>
              <EyeIcon />
            </ShowButton>
          </InputFieldContainer>
          <LoginButton>Đăng ký</LoginButton>
        </FormContent>
      </FormContainer>
    );
  };
  const LoginAs = () => {
    const Container = styled.div`
      display: flex;
      flex-direction: column;
      gap: 16px;
    `;
    const Title = styled.p`
      position: relative;
      color: var(--text-secondary, #4d5761);
      font-feature-settings:
        "liga" off,
        "clig" off;
      /* Typography/Body 2 */
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 157%;
      margin: 0;
      display: flex;
      justify-content: center;
      &:before {
        content: "";
        width: 33%;
        height: 1px;
        background-color: #dfe4ec;
        position: absolute;
        top: 46%;
        left: 0;
        @media (max-width: 435px) {
          width: 25%;
        }
      }
      &:after {
        content: "";
        width: 33%;
        height: 1px;
        background-color: #dfe4ec;
        position: absolute;
        top: 46%;
        right: 0;
        @media (max-width: 435px) {
          width: 25%;
        }
      }
      & > span {
        position: relative;
        &:before {
          content: "";
          background: #fff;
          width: 24px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 100%;
          z-index: 10;
        }
        &:after {
          content: "";
          background: #fff;
          width: 24px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 100%;
          z-index: 10;
        }
      }
    `;
    const LoginContainer = styled.div`
      display: flex;
      gap: 16px;
      @media (max-width: 767px) {
        flex-direction: column;
      }
    `;
    const ButtonLogin = styled.button`
      flex: 1;
      border-radius: 60px;
      border: 1px solid var(--secondary-outlineBorder, rgba(108, 115, 127, 0.5));
      background: var(--background-paper, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-main, #6c737f);
      font-feature-settings:
        "liga" off,
        "clig" off;
      /* Components/Button Large */
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px;
      height: 42px;
      gap: 8px;
    `;
    return (
      <Container>
        <Title>
          <span>Hoặc đăng nhập bằng</span>
        </Title>
        <LoginContainer>
          <ButtonLogin>
            <GoogleIcon />
            Tài khoản Google
          </ButtonLogin>
          <ButtonLogin>
            <FacebookIcon />
            Tài khoản Facebook
          </ButtonLogin>
        </LoginContainer>
      </Container>
    );
  };
  return (
    <Wrapper>
      <LeftContainer>
        <ImageBackground src="/images/bg-login.svg" />
      </LeftContainer>
      <RightContainer>
        <MainContainer>
          <TitleContainer>
            <TitleIcon />
            <Title>Đặt sân online</Title>
          </TitleContainer>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <LoginAs />
        </MainContainer>
      </RightContainer>
    </Wrapper>
  );
};

export default Login;
