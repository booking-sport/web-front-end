import styled from "styled-components";

export const ScheduleContainer = styled.div`
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    padding: 24px;
    background: var(--background-paper, #fff);
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.08);
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
        @media (max-width: 1023px) {
          position: fixed;
          top: 100px;
          background: #fff;
        }
        @media (max-width: 1200px) {
          background: #fff;
        }
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
     .header .title h3.name {
        font-size: 24px;
      }
         .header .fixed-booking {
        font-size: 13px;
      }
      .header {
        flex-direction: column;
      }
       .unit-status {
        .unit-item {
          flex-direction: column;
          flex: 1;
          .text-status {
            font-size: 13px;
            text-align: center;
          }
          .color.white {
            box-sizing: border-box;
          }
        }
      }
    }
    &.payment-container {
      .content-container {
        .content {
          max-width: 920px;
          margin: 0 auto;
          border-radius: 0;
          border: 0;
          box-shadow: none;
          background-color: transparent;
          display: flex;
          flex-direction: column;
          gap: 10px;
          .content-header {
            justify-content: flex-start;
            align-items: flex-start;
            border-radius: 16px;
            border: 1px solid var(--divider, #d6d6e1);
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            background: var(--background-paper, #fff);
            padding: 20px;
            .title {
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
              margin-bottom: 20px;
            }
            .info {
              display: flex;
              flex-direction: column;
              gap: 12px;
              width: 100%;
              .name-number {
                display: flex;
                gap: 12px;
                > div {
                  flex: 1;
                }
              }
            }
          }
          .content-info {
            border-radius: 16px;
            border: 1px solid var(--divider, #d6d6e1);
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            background: var(--background-paper, #fff);
            padding: 20px;
            .title {
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
              margin-bottom: 20px;
            }
            .info {
              .stadium,
              .address {
                color: var(--text-primary, #111927);
                font-feature-settings:
                  "liga" off,
                  "clig" off;
                /* Typography/Subtitle 1 */
                font-family: Inter;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: 157%;
                display: flex;
                gap: 5px;
                margin-bottom: 8px;
                .name-title {
                  color: var(--text-secondary, #4d5761);
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
              .detail-info {
                border-radius: 12px;
                background: var(--primary-selected, rgba(29, 154, 108, 0.08));
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                .date {
                  color: var(--text-primary, #111927);
                  font-feature-settings:
                    "liga" off,
                    "clig" off;
                  /* Typography/Subtitle 1 */
                  font-family: Inter;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 157%;
                  display: flex;
                  gap: 5px;
                  .name-title {
                    color: var(--text-secondary, #4d5761);
                    font-feature-settings:
                      "liga" off,
                      "clig" off;
                    /* Typography/Body 1 */
                    font-family: Inter;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%;
                  }
                }
                .order-item {
                  display: flex;
                  justify-content: space-between;
                  > div {
                    display: flex;
                    gap: 5px;
                    .title {
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
                    .time {
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
                    .price {
                      color: var(--error-main, #f04438);
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
                    .delete {
                      padding: 0;
                    }
                  }
                }
              }
              .line {
                margin: 12px 0;
                height: 1px;
                width: 100%;
                background: #dfe4ec;
              }
              .overview {
                display: flex;
                flex-direction: column;
                gap: 8px;
                > div {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                .title {
                  color: var(--text-secondary, #4d5761);
                  font-feature-settings:
                    "liga" off,
                    "clig" off;
                  font-family: Inter;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 157%;
                  margin: 0;
                }
                .total-time {
                  color: var(--text-primary, #111927);
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
                .total-price {
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
                .payment-method {
                  color: var(--text-primary, #111927);
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
                .must-payment {
                  color: var(--error-main, #f04438);
                  font-feature-settings:
                    "liga" off,
                    "clig" off;
                  /* Typography/H5 */
                  font-family: "Plus Jakarta Sans";
                  font-size: 24px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: 120%;
                }
              }
            }
          }
          .button-actions {
            display: flex;
            gap: 10px;
            align-items: center;
            button {
              flex: 1;
              width: 100%;
              padding: 8px;
              &.back {
                border-radius: 60px;
                border: 1px solid
                  var(--primary-outlineBorder, rgba(29, 154, 108, 0.5));
                background: var(--background-paper, #fff);
                color: var(--primary-main, #1d9a6c);
                font-feature-settings:
                  "liga" off,
                  "clig" off;
                /* Components/Button Large */
                font-family: Inter;
                font-size: 15px;
                font-style: normal;
                font-weight: 600;
                line-height: 26px;
              }
              &.confirm-payment {
                border-radius: 60px;
                background: var(--primary-main, #1d9a6c);
                /* elevation/1 */
                box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
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
              }
            }
          }
        }
      }
      .dialog-container {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.55);
        .dialog {
          border-radius: 20px;
          background: var(--background-paper, #fff);
          box-shadow: 0px 9px 46px 0px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 704px;
          &-header {
            padding: 32px 24px 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
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
            .close {
              padding: 0;
            }
          }
          &-footer {
            display: flex;
            padding: 16px 24px;
            gap: 12px;
            justify-content: flex-end;
            .cancel {
              padding: 8px 22px;
              border-radius: 60px;
              background: var(--secondary-main, #6c737f);
              /* elevation/1 */
              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
              color: var(--secondary-contrast, #fff);
              font-feature-settings:
                "liga" off,
                "clig" off;
              /* Components/Button Large */
              font-family: Inter;
              font-size: 15px;
              font-style: normal;
              font-weight: 600;
              line-height: 26px;
            }
            .confirm {
              padding: 8px 22px;
              border-radius: 60px;
              background: var(--primary-main, #1d9a6c);
              /* elevation/1 */
              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
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
            }
          }
          &-content {
            padding: 12px 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            .title {
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
            .bank-info {
              display: flex;
              gap: 12px;
              img {
                max-width: 155px;
              }
              .info {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                &-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .title {
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
                  }
                  .value {
                    color: var(--text-primary, #111927);
                    text-align: right;
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
          .order-detail {
            border-radius: 12px;
            border: 1px solid var(--divider, #dfe4ec);
            background: var(--background-paper-tertiary, #f8f9fa);
            padding: 12px 20px;
            display: flex;
            gap: 20px;
            flex-direction: column;
            .title {
              display: flex;
              justify-content: space-between;
              align-items: center;
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
              > button {
                transform: unset;
                &.show {
                  transform: rotate(90deg);
                }
              }
            }
            .order-detail-content {
              display: flex;
              flex-direction: column;
              gap: 10px;
              .stadium-info {
                .stadium-name,
                .stadium-address {
                  display: flex;
                  gap: 8px;
                  .title {
                    color: var(--text-secondary, #4d5761);
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
                  .value {
                    color: var(--text-primary, #111927);
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
              .order-detail {
                padding: 16px;
                border-radius: 12px;
                background: var(--primary-selected, rgba(29, 154, 108, 0.08));
                display: flex;
                flex-direction: column;
                gap: 8px;
                .date {
                  color: var(--text-primary, #111927);
                  font-feature-settings:
                    "liga" off,
                    "clig" off;
                  /* Typography/Subtitle 1 */
                  font-family: Inter;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 157%;
                  .name-title {
                    font-feature-settings:
                      "liga" off,
                      "clig" off;
                    /* Typography/Body 1 */
                    font-family: Inter;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%;
                  }
                }
              }
              .order-item {
                display: flex;
                justify-content: space-between;
                > div {
                  display: flex;
                  gap: 5px;
                  .title {
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
                  .time {
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
                  .price {
                    color: var(--error-main, #f04438);
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
                  .delete {
                    padding: 0;
                  }
                }
              }
            }
          }
        }
        .price-info {
          .total-price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
              color: var(--text-primary, #111927);
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
            .value {
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
          }
          .deposit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
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
            .value {
              color: var(--error-main, #f04438);
              font-feature-settings:
                "liga" off,
                "clig" off;
              /* Typography/H5 */
              font-family: "Plus Jakarta Sans";
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: 120%;
            }
          }
        }
        .message {
          border-radius: 12px;
          background: var(--warning-lightest, #fffaeb);
          padding: 12px;
          text-align: center;
          color: var(--warning-dark, #b54708);
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
          .time {
            color: var(--warning-dark, #b54708);
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
      }
    }
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
    min-width: 70px;
    @media (min-width: 768px) {
      min-width: 100px;
    }
  }
  table {
    border-left: none;
    border-bottom: none;
    border-right: none;
  }
`;

export const TitleField = styled.span`
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
export const InputFieldContainer = styled.div`
  padding: 24px 12px 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--divider, #dfe4ec);
  position: relative;
  display: flex;
`;
export const InputField = styled.input`
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
export const FixedSettingPopup = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
  .popup-content {
    border-radius: 20px;
    background: var(--background-paper, #fff);
    box-shadow: 0px 9px 46px 0px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 704px;
    position: relative;
    padding: 29px 24px;
    .btn-close {
      position: absolute;
      top: 28px;
      right: 32px;
    }
    h3.title {
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
    .select-duration {
      margin: 16px 0;
      label {
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
      .time-options {
        display: flex;
        gap: 32px;
        .time-item {
          display: flex;
          align-items: center;
          gap: 8px;
          input {
            margin: 0;
          }
        }
      }
    }
    .select-time {
      display: flex;
      flex-direction: column;
      gap: 8px;
      label {
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
      .time-container {
        display: flex;
        gap: 12px;
        > div {
          flex: 1;
          .react-datepicker-wrapper {
            width: 100%;
            input {
              width: 100%;
              border: 0;
              background-color: transparent;
              outline: none;
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
          }
        }
      }
    }
    .note {
      margin-top: 16px;
    }
    .actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      .btn-save,
      .btn-cancel {
        border-radius: 60px;
        /* elevation/1 */
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
        padding: 8px 22px;
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
      }
      .btn-cancel {
        background: var(--secondary-main, #6c737f);
      }
      .btn-save {
        background: var(--primary-main, #1d9a6c);
      }
    }
  }
`;
export const ErrorMessage = styled.p`
  color: var(--error-main, #f04438);
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