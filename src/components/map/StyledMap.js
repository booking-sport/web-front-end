import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  .maplibregl-popup {
    transform: unset !important;
    max-width: unset !important;
    width: 100%;
    z-index: 100;
    .maplibregl-popup-content {
      max-width: 512px;
      position: fixed;
      top: 95px;
      left: 24px;
      padding: 0;
      border-radius: 16px;
      border: 1px solid var(--divider, #dfe4ec);
      background: var(--background-paper, #fff);
      /* elevation/5 */
      box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      width: calc(100% - 48px);
      .maplibregl-popup-close-button {
        color: white;
        font-size: 24px;
        padding: 6px 12px;
      }
      @media (min-width: 512px) {
        width: 100%;
      }
    }
  }
  .focus-location {
    position: fixed;
    bottom: 50px;
    right: 16px;
    z-index: 100;
  }
  .focus-user-location-btn {
    position: relative;
    border-radius: 8px;
    display: block;
    width: 29px;
    height: 29px;
    overflow: hidden;
    cursor: pointer;
    -webkit-transition: background-color 0.16s ease-out;
    transition: background-color 0.16s ease-out;
    background: #fff;
    border: 0;
    box-shadow:
      0 1px 2px rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
    > span {
      background-image: url(/icons/focus-location.png);
      background-size: 36px 18px;
      -webkit-animation: acquiring-animation 1s steps(1) infinite;
      animation: acquiring-animation 1s steps(1) infinite;
      color: #202124;
      display: block;
      height: 18px;
      left: 6px;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 6px;
      width: 18px;
    }
    @keyframes acquiring-animation {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: -18px 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  }
`;

export const FilterSortContainer = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 27px;
  left: 24px;
  z-index: 10;
  @media (max-width: 1919px) {
    max-width: calc(100% - 48px);
  }
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 16px;
  }
`;
export const FilterContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: 1px solid var(--divider, #dfe4ec);
  background: var(--background-paper, #fff);
  min-width: 500px;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.08);
  position: relative;
  > input {
    color: var(--text-disabled, rgba(17, 25, 39, 0.38));
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
    outline: none;
    border: none;
    &::placeholder {
      color: var(--text-disabled, rgba(17, 25, 39, 0.38));
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
    }
  }
  > button {
    background: transparent;
    border: 0;
  }
  @media (max-width: 1919px) {
    min-width: 30%;
  }
  @media (max-width: 767px) {
    padding: 8px;
  }
  .popup-bar {
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
    overflow-y: auto;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    z-index: 1000;
    border-radius: 16px;
    background: var(--background-paper, #fff);
    box-shadow: 0px 3px 14px 0px rgba(0, 0, 0, 0.08);
    max-height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 767px) {
      top: 50px;
    }
  }

  .popup-item {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .top {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      justify-content: space-between;
      a.booking {
        border-radius: 60px;
        background: var(--primary-main, #1d9a6c);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
        border: 0;
        display: flex;
        align-items: center;
        color: var(--primary-contrast, #fff);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        gap: 8px;
        text-decoration: none;
        padding: 6px 16px;
        white-space: nowrap;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        h3.name {
          color: #000;

          font-feature-settings:
            "liga" off,
            "clig" off;
          /* Typography/Subtitle 1 */
          font-family: Inter;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 157%;
        }
      }
    }
    .address {
      display: flex;
      gap: 24px;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      span {
        color: var(--text-secondary, #4d5761);
        font-feature-settings:
          "liga" off,
          "clig" off;
        /* Typography/Caption */
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 166%;
        white-space: nowrap;
        position: relative;

        &:not(:last-child):after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          right: -14px;
          top: 43%;
          border-radius: 10px;
          background-color: #4d5761;
        }
      }
    }
  }

  .popup-item:hover {
    background-color: #f5f5f5;
  }

  .popup-item:active {
    background-color: #e5e5e5;
  }
  .field-detail {
    max-width: 512px;
    width: calc(100% - 48px);
    position: fixed;
    top: 95px;
    left: 24px;
    padding: 0;
    border-radius: 16px;
    border: 1px solid var(--divider, #dfe4ec);
    background: var(--background-paper, #fff);
    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
`;
export const SortContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .sort-item {
    padding: 8px 22px;
    border-radius: 60px;
    border: 1px solid var(--secondary-outlineBorder, rgba(108, 115, 127, 0.5));
    background: var(--background-paper, #fff);
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--secondary-main, #6c737f);
    font-feature-settings:
      "liga" off,
      "clig" off;
    /* Components/Button Large */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px; /* 173.333% */
    &.active {
      background: var(--primary-main, #1d9a6c);
      color: var(--primary-contrast, #fff);
    }
    @media (max-width: 1919px) {
      font-size: 13px;
      text-wrap: nowrap;
    }
    @media (max-width: 767px) {
      padding: 6px 12px;
    }
  }
  @media (max-width: 1919px) {
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const FieldDetailContainer = styled.div`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  > img.main-image {
    max-width: 100%;
  }
  .btn-close {
    position: absolute;
    top: 12px;
    right: 16px;
    padding: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
  }
  .stadium-info {
    .top {
      padding: 20px 20px 8px;
      display: flex;
      gap: 8px;
      justify-content: space-between;
      align-items: center;
      .name-rate {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .name {
          color: #000;
          font-feature-settings:
            "liga" off,
            "clig" off;
          /* Typography/H6 */
          font-family: "Plus Jakarta Sans";
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 120%;
          margin: 0;
        }
        .rate {
          color: var(--text-secondary, #4d5761);
          font-feature-settings:
            "liga" off,
            "clig" off;
          /* Typography/Caption */
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 166%;
        }
      }
      .booking {
        border-radius: 60px;
        background: var(--primary-main, #1d9a6c);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
        border: 0;
        display: flex;
        align-items: center;
        color: var(--primary-contrast, #fff);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        gap: 8px;
        text-decoration: none;
        padding: 6px 16px;
        white-space: nowrap;
      }
      @media (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .mid {
      padding: 12px 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      > div {
        display: flex;
        align-items: center;
        gap: 8px;
        svg {
          min-width: 20px;
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 20px 16px;
      border-top: 1px solid var(--divider, #dfe4ec);
      .title {
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
        margin: 0;
      }
      .list-images {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        .image-item {
          border-radius: 12px;
          overflow: hidden;
          min-width: 100px;
          height: 150px;
          max-width: 49%;
          flex: 1;
          > img {
            object-fit: cover;
            max-width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;

export const RateDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
`;

export const RatingScore = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ffa500;
`;

export const RatingCount = styled.span`
  font-size: 14px;
  color: #6c737f;
`;
