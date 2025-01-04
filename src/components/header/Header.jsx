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
import { logout } from "@components/services/auth";
const Header = ({ user }) => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [showLogout, setShowLogout] = useState(false);
  const [error, setError] = useState("");
  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };
  const handleLogout = async (e) => {
    await logout();
  };
  const Logo = () => {
    return (
      <LogoContainer>
        <Link to="/">{isMobile ? <LogoMobile /> : <LogoFull />}</Link>
      </LogoContainer>
    );
  };
  const savedUser = JSON.parse(localStorage.getItem("user"));

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
        link: `${savedUser ? "/account" : "/login"}`,
        title: "Quản lý tài khoản",
        logo: Account,
      },
    ];
    const path = location.pathname.split("/").slice(0, 2).join("/");
    return (
      <NavContainer>
        {listNav &&
          listNav.length > 0 &&
          listNav.map((item, index) => {
            const LogoComponent = item?.logo;
            const isActive = path === item.link;
            return (
              <NavItem key={index} className={isActive ? "active" : ""}>
                {
                  <Link
                    to={item.link === "/booking" ? "/list-stadium" : item?.link}
                  >
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
        {user ? (
          <Link onClick={handleShowLogout} id="showLogout" to={"#"}>
            <AccountImage src="/icons/Avatar.svg" />
            <Name>{user.full_name}</Name>
          </Link>
        ) : (
          <Link to={"/login"}>
            <AccountImage src="/icons/Avatar.svg" />
            <Name>Đăng nhập</Name>
          </Link>
        )}
        {showLogout && (
          <div className="logout-container" onClick={handleLogout}>
            Đăng xuất
          </div>
        )}
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
        link: `${savedUser ? "/account" : "/login"}`,
        title: "Quản lý tài khoản",
        logo: Account,
      },
    ];
const path = location.pathname.split("/").slice(0, 2).join("/");
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
                to={item.link === "/booking" ? "/list-stadium" : item?.link}
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

      <MobileNavigation />
    </HeaderContainer>
  );
};

export default Header;
