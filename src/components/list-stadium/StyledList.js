import styled from "styled-components";

export const ListContainer = styled.div``;
export const ListHeaderContainer = styled.div`
  background: var(--background-paper, #fff);
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
  padding: 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
export const ListHeaderTitle = styled.h3`
  color: var(--text-primary, #111927);
  font-feature-settings:
    "liga" off,
    "clig" off;
  /* Typography/H4 */
  font-family: "Plus Jakarta Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  margin: 0;
  flex: 3;
  @media (max-width: 767px) {
    flex: 1;
    width: 100%;
    font-size: 18px;
  }
`;
export const SearchContainer = styled.div`
  border-radius: 8px;
  border: 1px solid var(--divider, #dfe4ec);
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 9px 12px;
  flex: 2;
  @media (max-width: 767px) {
    flex: 1;
    width: 100%;
  }
  > span {
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
  }
  > div {
    display: flex;
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
      border: 0;
      padding: 0;
      &:focus-visible {
        outline: none;
      }
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
      padding: 0;
      display: inline-flex;
    }
  }
`;

export const TimeContainer = styled.div`
  border-radius: 8px;
  border: 1px solid var(--divider, #dfe4ec);
  display: flex;
  flex-direction: column;
  padding: 9px 12px;
  flex: 1;
  position: relative;
  @media (max-width: 1023px) {
    flex: 2;
  }
  @media (max-width: 767px) {
    flex: 1;
    width: 100%;
  }
  > span {
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
  }
  .date-time {
    display: flex;
    .text-time {
      width: 100%;
      margin: 0;
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
    }
    .btn-select-time {
      border: 0;
      background: transparent;
      padding: 0;
      display: flex;
    }
    .popup-overlay {
      position: absolute;
      background: #fff;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--divider, #dfe4ec);
      right: 0;
      top: 100%;
      .popup-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        h3 {
          margin: 0;
        }
      }
      .time-picker {
        display: flex;
        gap: 20px;
        color: var(--text-primary, #111927);
        font-feature-settings:
          "liga" off,
          "clig" off;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: 0.15px;
      }
      .btn-close {
        border-radius: 60px;
        background: var(--primary-main, #1d9a6c);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
        border: 0;
        color: var(--primary-contrast, #fff);
        font-family: Inter;
        font-size: 14px;
        padding: 4px 12px;
        width: fit-content;
      }
    }
  }
`;

export const ListContentContainer = styled.div`
  background: #f7f8f9;
  padding: 24px;
  display: flex;
  gap: 12px;
  height: calc(100vh - 79px - 147px);
  @media (max-width: 1023px) {
    flex-direction: column;
    height: 100%;
  }
`;

export const LeftBarContainer = styled.div`
  border-radius: 20px;
  background: var(--background-paper, #fff);
  /* elevation/4 */
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 24px 16px;
`;
export const LeftBarTitle = styled.p`
  color: var(--text-primary, #111927);
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
  padding: 20px;
  @media (max-width: 1023px) {
    padding: 0px;
    margin-bottom: 20px;
  }
`;
export const CategoryItemContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 8px;
  border-radius: 12px;
  @media (max-width: 1023px) {
    padding: 10px 20px;
  }
  &.active {
    background: var(--primary-selected, rgba(29, 154, 108, 0.08));
  }
  .name {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 163px;

    .text-name {
      color: var(--text-primary, #111927);
      font-feature-settings:
        "liga" off,
        "clig" off;
      /* Typography/H6 */
      font-family: "Plus Jakarta Sans";
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%;
    }
    @media (max-width: 1023px) {
      min-width: unset;
      .text-name {
        white-space: nowrap;
        font-size: 16px;
      }
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  .status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .on,
    .off {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      color: var(--text-secondary, #4d5761);
      text-align: right;
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
`;
export const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1023px) {
    flex-direction: row;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const RightBarContainer = styled.div`
  border-radius: 16px;
  background: var(--background-paper, #fff);
  /* elevation/4 */
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 20px 24px;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
`;
export const StadiumItemContainer = styled.div`
  border-radius: 12px;
  border: 1px solid var(--divider, #dfe4ec);
  background: var(--background-paper, #fff);
  /* elevation/2 */
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.08);
  width: calc(20% - 50px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  height: fit-content;
  @media (max-width: 1919px) {
    width: calc(25% - 50px);
    max-width: unset;
  }
  @media (max-width: 1439px) {
    width: calc(33% - 45px);
    max-width: unset;
  }
  @media (max-width: 1200px) {
    width: calc(50% - 44px);
    max-width: unset;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  .stadium-image {
    width: 100%;
    border-radius: 12px;
  }
  .stadium-info {
    .stadium-name {
      color: var(--text-primary, #111927);
      font-feature-settings:
        "liga" off,
        "clig" off;
      text-overflow: ellipsis;
      /* Typography/Subtitle 1 */
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 157%;
    }
    .stadium-address {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      svg {
        min-width: 20px;
        height: 20px;
      }
      span {
        color: var(--text-secondary, #4d5761);
        font-feature-settings:
          "liga" off,
          "clig" off;
        text-overflow: ellipsis;
        /* Typography/Body 2 */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 157%;
      }
    }
    .stadium-tel {
      display: flex;
      gap: 8px;
      align-items: center;
      span {
        color: var(--info-main, #06aed4);
        font-feature-settings:
          "liga" off,
          "clig" off;
        /* Typography/Subtitle 2 */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 157%;
      }
    }
  }
  .action {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    button,
    a {
      padding: 6px 16px;
      border-radius: 60px;
      background: var(--background-paper, #fff);
      &.detail {
        border: 1px solid
          var(--secondary-outlineBorder, rgba(108, 115, 127, 0.5));
        color: var(--secondary-main, #6c737f);
        /* Components/Button Medium */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
      }
      &.booking {
        border-radius: 60px;
        background: var(--primary-main, #1d9a6c);
        /* elevation/1 */
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
        border: 0;
        display: flex;
        align-items: center;
        color: var(--primary-contrast, #fff);
        /* Components/Button Medium */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        gap: 8px;
        text-decoration: none;
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

export const PopupBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 640px;
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transform: translateX(100%);
  animation: slideIn 0.3s forwards;
  padding: 24px 20px;
  overflow-y: auto;
  box-sizing: border-box;
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .book-popup {
    display: flex;
    align-items: center;
    background-color: #1d9a6c;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  .tabs {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .tab-btn {
    flex: 1;
    padding: 10px 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #6c737f;
    text-align: center;
  }

  .tab-btn.active {
    color: #1d9a6c;
    font-weight: bold;
    border-bottom: 2px solid #1d9a6c;
  }

  .tab-content {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    }
    .overview {
      padding: 12px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border-bottom: 1px solid var(--divider, #dfe4ec);
      .address,
      .tel,
      .time {
        display: flex;
        gap: 8px;
        align-items: center;
        color: var(--text-primary, #111927);
        font-feature-settings:
          "liga" off,
          "clig" off;
        /* Typography/Body 2 */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 157%;
      }
    }
    .media {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 20px;
      border-bottom: 1px solid var(--divider, #dfe4ec);
      .list-images {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        .image-item {
          border-radius: 12px;
          overflow: hidden;
          min-width: 100px;
          height: 150px;
          > img {
            object-fit: cover;
            max-width: 100%;
            height: 100%;
          }
        }
      }
    }
    .rate {
      .rating-container {
        display: flex;
        margin-top: 10px;
        .rating-progress {
          display: flex;
          flex-direction: column;
          width: 60%;
          .rating-item {
            display: flex;
            align-items: center;
            gap: 12px;
          }
        }
        .averageRate {
          width: 40%;
          color: var(--text-primary, #111927);
          text-align: center;
          font-feature-settings:
            "liga" off,
            "clig" off;
          /* Typography/H5 */
          font-family: "Plus Jakarta Sans";
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 120%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .tab-content.price,
  .tab-content.open-time {
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    table th,
    table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }

    table th {
      background: #f8f8f8;
      font-weight: bold;
    }

    table tbody tr:nth-child(even) {
      background: #f9f9f9;
    }
  }
  .tab-content.open-time {
  }
  .tab-content .rate-detail {
    .rate-container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      .rate-item {
        display: flex;
        gap: 8px;
        flex-direction: column;
        .user-info {
          display: flex;
          gap: 16px;
          color: var(--text-primary, #111927);
          font-feature-settings:
            "liga" off,
            "clig" off;
          text-overflow: ellipsis;
          font-family: Inter;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 157%;
        }
        .score {
          display: flex;
          gap: 8px;
          span {
            color: var(--text-secondary, #4d5761);
            font-feature-settings:
              "liga" off,
              "clig" off;
            text-overflow: ellipsis;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 157%;
          }
        }
        .comment {
          display: flex;
          flex-direction: column;
          gap: 8px;
          .text {
            color: #000;
            font-feature-settings:
              "liga" off,
              "clig" off;
            text-overflow: ellipsis;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 157%;
            overflow-x: hidden;
          }
        }
      }
    }
  }
  .book-popup {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1d9a6c;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }
  .popup-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      .title {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .close-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary, #111927);
          font-feature-settings:
            "liga" off,
            "clig" off;
          /* Typography/Body 1 */
          font-family: Inter;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
          background-color: transparent;
          border: 0;
          padding: 0;
        }
        h3.name {
          color: var(--text-primary, #111927);
          font-feature-settings:
            "liga" off,
            "clig" off;
          /* Typography/H4 */
          font-family: "Plus Jakarta Sans";
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: 120%;
          margin: 0;
        }
        h3.type {
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
        }
      }
      .booking {
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
        border-radius: 60px;
        background: var(--primary-main, #1d9a6c);
        /* elevation/1 */
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
        border: 0;
        padding: 8px 22px;
        a {
          text-decoration: none;
          color: var(--primary-contrast, #fff);
        }
      }
    }
    .popup-image {
      width: 100%;
      height: auto;
      border-radius: 12px;
    }
  }
`;
