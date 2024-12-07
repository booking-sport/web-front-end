import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  .maplibregl-popup {
    position: unset !important;
    transform: unset !important;
    .maplibregl-popup-content {
      width: 512px;
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
      .maplibregl-popup-close-button {
        color: white;
        font-size: 24px;
        padding: 6px 12px;
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
  .stadium-info {
    .top {
      padding: 20px 20px 8px;
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
          > img {
            object-fit: cover;
            max-width: 100%;
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
