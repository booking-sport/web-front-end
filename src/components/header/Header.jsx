import { useState } from "react";
import {
  Account,
  BookStadium,
  Home,
  ListStadium,
  LogoFull,
  LogoMobile,
} from "@components/icons/svg";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import {
  AccountImage,
  AccountManagerContainer,
  HeaderContainer,
  LogoContainer,
  Name,
  NavContainer,
  NavItem,
  MobileNav,
  MobileNavToggle,
  MobileNavOverlay,
} from "./StyledHeader";
const Header = () => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const Logo = () => {
    return (
      <LogoContainer>
        <Link to="/">{isMobile ? <LogoMobile /> : <LogoFull />}</Link>
      </LogoContainer>
    );
  };
  const Nav = () => {
    const listNav = [
      {
        link: "/",
        title: "Trang chủ",
        logo: Home,
      },
      {
        link: "/list-stadium",
        title: "Danh sách sân",
        logo: ListStadium,
      },
      {
        link: "/booking",
        title: "Đặt sân",
        logo: BookStadium,
      },
      {
        link: "/#",
        title: "Quản lý tài khoản",
        logo: Account,
      },
    ];
    return (
      <NavContainer>
        {listNav &&
          listNav.length > 0 &&
          listNav.map((item, index) => {
            const LogoComponent = item?.logo;
            const isActive = location.pathname === item.link;
            return (
              <NavItem key={index} className={isActive ? "active" : ""}>
                {
                  <Link to={item?.link}>
                    <LogoComponent />
                    {item?.title}
                  </Link>
                }
              </NavItem>
            );
          })}
      </NavContainer>
    );
  };
  const AccountManager = () => {
    return (
      <AccountManagerContainer>
        <Link to={"/account"}>
          <AccountImage src="/icons/Avatar.svg" />
          <Name>Nguyeexn Dinh Dat</Name>
        </Link>
      </AccountManagerContainer>
    );
  };
  const MobileNavigation = () => {
    const listNav = [
      {
        link: "/",
        title: "Trang chủ",
        logo: Home,
      },
      {
        link: "/list-stadium",
        title: "Danh sách sân",
        logo: ListStadium,
      },
      {
        link: "/booking",
        title: "Đặt sân",
        logo: BookStadium,
      },
      {
        link: "/#",
        title: "Quản lý tài khoản",
        logo: Account,
      },
    ];

    return (
      <MobileNav className={isMobileNavOpen ? "open" : ""}>
        <MobileNavOverlay onClick={() => setIsMobileNavOpen(false)} />
        <div className="mobile-nav-content">
          {listNav &&
            listNav.length > 0 &&
            listNav.map((item, index) => {
              const LogoComponent = item?.logo;
              const isActive = location.pathname === item.link;
              return (
                <NavItem key={index} className={isActive ? "active" : ""}>
                  <Link
                    to={item?.link}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <LogoComponent />
                    {item?.title}
                  </Link>
                </NavItem>
              );
            })}
        </div>
      </MobileNav>
    );
  };
  return (
    <HeaderContainer>
      <Logo />
      <Nav />
      <AccountManager />
      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        <span className="hamburger"></span>
      </MobileNavToggle>

      {/* Nav Mobile */}
      <MobileNavigation />
    </HeaderContainer>
  );
};

export default Header;
