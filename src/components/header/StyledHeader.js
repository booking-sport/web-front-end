import styled from "styled-components";

export const HeaderContainer = styled.div`
  border-bottom: 1px solid var(--nav-blend-in-border-color, #f2f4f7);
  background: var(--primary-main, #1d9a6c);
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  position: relative;
  @media (max-width: 1200px) {
    padding-right: 80px;
  }
  @media (max-width: 767px) {
    padding: 16px;
    padding-right: 65px;
  }
`;

export const AccountManagerContainer = styled.div`
  position: relative;
  > a {
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--primary-contrast, #fff);
    font-feature-settings:
      "liga" off,
      "clig" off;
    /* Typography/Subtitle 1 */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%;
    text-decoration: none;
    position: relative;
  }
  .logout-container {
    position: absolute;
    background: var(--background-paper, #fff);
    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.08);
    top: 100%;
    right: 0;
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
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 1000;
    white-space: nowrap;
  }
`;
export const AccountImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;
export const Name = styled.span``;
export const NavContainer = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 1200px) {
    display: none;
  }
`;
export const NavItem = styled.div`
  padding: 8px 22px;
  &.active {
    border-radius: 60px;
    border: 1px solid var(--primary-contrast, #fff);
  }
  > a {
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--neutral-200, #e5e7eb);
    font-feature-settings:
      "liga" off,
      "clig" off;
    /* Components/Button Large */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    text-decoration: none;
  }
`;
export const LogoContainer = styled.div``;

export const MobileNavToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 15;

  .hamburger {
    width: 25px;
    height: 2px;
    background: #fff;
    display: block;
    position: relative;
  }

  .hamburger::before,
  .hamburger::after {
    content: "";
    width: 25px;
    height: 2px;
    background: #fff;
    display: block;
    position: absolute;
    transition: all 0.3s ease;
  }

  .hamburger::before {
    top: -8px;
  }

  .hamburger::after {
    bottom: -8px;
  }

  @media (max-width: 1200px) {
    display: block;
    position: absolute;
    top: 35px;
    right: 24px;
  }
  @media (max-width: 7670px) {
    right: 16px;
  }
`;

// Mobile Nav Overlay
export const MobileNavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

// Mobile Nav Container
export const MobileNav = styled.div`
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  height: 100%;
  background: #1d9a6c;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  display: none;
  &.open {
    right: 0;
    display: block;
  }

  .mobile-nav-content {
    padding: 20px;
    position: relative;
    z-index: 1000;
    height: 100%;
    background: #1d9a6c;
    ${NavItem} {
      margin: 10px 0;
      max-width: 180px;
      a {
        font-size: 15px;
        svg {
          margin-right: 10px;
        }
      }

      &.active a {
        font-weight: bold;
      }
    }
  }
`;
