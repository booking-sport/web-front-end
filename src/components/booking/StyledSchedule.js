import styled from "styled-components";

export const ScheduleContainer = styled.div`
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    padding: 24px;
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
    .fixed-booking {
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
  .content-container {
    background: #f7f8f9;
    padding: 24px;
    .content {
      border-radius: 16px;
      border: 1px solid var(--divider, #d6d6e1);
      /* elevation/2 */
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      background: var(--background-paper, #fff);
      .content-header {
        padding: 20px 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        position: relative;
        .date-time {
          position: relative;
          .popup-overlay {
            position: absolute;
            top: 100%;
          }
          .select-date-container {
            display: flex;
            align-items: center;
            gap: 16px;
            height: 40px;
            .select-date {
              display: flex;
              align-items: center;
              .btn-select-time {
                display: flex;
                padding: 0;
                gap: 8px;
                align-items: center;
                color: var(--text-primary, #111927);
                text-align: center;
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
            }
            .btn-prev,
            .btn-next {
              padding: 0;
              display: flex;
            }
          }
        }
        .unit-status {
          display: flex;
          gap: 24px;
          .unit-item {
            display: flex;
            align-items: center;
            gap: 8px;
            .color {
              width: 28px;
              height: 28px;
              border: 1px solid #dfe4ec;
              border-radius: 8px;
              &.white {
                background: #fff;
              }
              &.green {
                background: #1d9a6c;
                border: 0;
              }
              &.grey {
                background: rgba(17, 25, 39, 0.12);
                border: 0;
              }
              &.red {
                background: #f04438;
                border: 0;
              }
            }
          }
        }
      }
      .popup-order-overlay {
        position: absolute;
        right: 13px;
        top: 13px;
        padding: 12px;
        border-radius: 12px;
        border: 1px solid var(--primary-outlineBorder, rgba(29, 154, 108, 0.5));
        background: var(--primary-hovered, rgba(29, 154, 108, 0.04));
        .popup-order-content {
          display: flex;
          gap: 8px;
          flex-direction: column;
          .info {
            display: flex;
            gap: 8px;
            span {
              color: var(--text-secondary, #4d5761);
              text-align: center;
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
            .orders {
              display: flex;
              gap: 8px;
              max-width: 450px;
              overflow-x: auto;
              white-space: nowrap;
              -ms-overflow-style: none;
              scrollbar-width: none;
              &::-webkit-scrollbar {
                display: none;
              }
              > div {
                display: flex;
                gap: 5px;
                color: var(--text-primary, #111927);
                text-align: center;
                font-feature-settings:
                  "liga" off,
                  "clig" off;
                font-family: Inter;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 156%;
                ul {
                  display: flex;
                  gap: 8px;
                  color: var(--text-primary, #111927);
                  text-align: center;
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
          }
        }
        .payment {
          display: flex;
          align-items: center;
          gap: 16px;
          .total-price {
            display: flex;
            gap: 4px;
            align-items: flex-end;
            .title {
              color: var(--text-secondary, #4d5761);
              text-align: center;
              font-feature-settings:
                "liga" off,
                "clig" off;
              /* Typography/Body 2 */
              font-family: Inter;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 153%;
            }
            .price {
              color: var(--error-main, #f04438);
              text-align: center;
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
          }
          .btn-payment {
            display: flex;
            padding: 6px 16px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-radius: 60px;
            border: 1px solid
              var(--primary-outlineBorder, rgba(29, 154, 108, 0.5));
            background: var(--background-paper, #fff);
            color: var(--primary-main, #1d9a6c);
            /* Components/Button Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px;
          }
        }
      }
    }
  }
  &.schedule-container {
  }

  .table-container {
    overflow-x: auto;
    // -ms-overflow-style: none;
    // scrollbar-width: none;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .cell {
    background-color: #fff;
  }
  .cell.block {
    background-color: rgba(17, 25, 39, 0.12);
    color: #fff;
    cursor: not-allowed;
  }
  .cell.booked {
    background-color: #f04438;
    color: #fff;
    cursor: not-allowed;
  }

  .cell.selected {
    background-color: #1d9a6c;
    color: #fff;
  }

  .actions {
    margin-top: 20px;
    text-align: right;
  }

  tbody td:first-child,
  tbody th:first-child,
  thead th:first-child {
    position: sticky;
    left: 0;
    background: #fff;
    z-index: 1;
    min-width: 100px;
  }
  table {
    border-left: none;
    border-bottom: none;
    border-right: none;
  }
`;
