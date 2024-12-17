import styled from "styled-components";

export const AccountContainer = styled.div`
  background: var(--background-paper-tertiary, #f8f9fa);
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
    }
  }
  .account-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .content-header {
      padding: 32px 24px;
      border-radius: 20px;
      border: 1px solid var(--divider, #dfe4ec);
      background: var(--background-paper, #fff);
      /* elevation/custom */
      box-shadow:
        0px 0px 0px 0.5px rgba(0, 0, 0, 0.03),
        0px 5px 22px 0px rgba(0, 0, 0, 0.04);
      .title {
        color: var(--text-primary, #111927);
        font-feature-settings:
          "liga" off,
          "clig" off;
        /* Typography/H5 */
        font-family: "Plus Jakarta Sans";
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        margin-bottom: 16px;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 12px;
        > div {
          display: flex;
          gap: 12px;
          > div {
            flex: 1;
            width: 50%;
            &.fullName,
            &.password,
            &.phoneNumber {
              display: flex;
            }
          }
        }
        .edit,
        .change {
          color: var(--primary-main, #1d9a6c);
          /* Components/Button Medium */
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px;
          white-space: nowrap;
          padding: 5px 10px;
        }
      }
    }
    .content-history {
      border-radius: 20px;
      border: 1px solid var(--divider, #dfe4ec);
      background: var(--background-paper, #fff);
      /* elevation/custom */
      box-shadow:
        0px 0px 0px 0.5px rgba(0, 0, 0, 0.03),
        0px 5px 22px 0px rgba(0, 0, 0, 0.04);
      .history-header {
        display: flex;
        padding: 24px;

        .title {
          flex: 3;
          display: flex;
          flex-direction: column;
          gap: 8px;
          .text-title {
            color: var(--text-primary, #111927);
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
          .subtitle {
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
        }
      }
      .table-container {
        width: 100%;
        .booking-table {
          width: 100%;
          border-collapse: collapse;
        }

        .booking-table th,
        .booking-table td {
          text-align: center;
          padding: 12px 10px;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        /* Header */
        .booking-table thead tr {
          background-color: #f7f7f7;
          font-weight: bold;
        }

        /* Status Labels */
        .status-label {
          font-size: 12px;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 100px;
          display: inline-block;
        }

        .status-success {
          color: #107569;
          background-color: rgba(21, 183, 158, 0.12);
        }

        .status-pending {
          color: #b54708;
          background-color: rgba(247, 144, 9, 0.12);
        }

        .status-cancelled {
          color: #b42318;
          background-color: rgba(240, 68, 56, 0.12);
        }

        /* Buttons */
        .btn-detail,
        .btn-cancel {
          padding: 6px 12px;
          font-size: 12px;
          border-radius: 15px;
          border: none;
          cursor: pointer;
          margin-right: 5px;
        }

        .btn-detail {
          background-color: #2e7d32;
          color: #fff;
        }

        .btn-cancel {
          background-color: #f44336;
          color: #fff;
        }

        .btn-detail:hover,
        .btn-cancel:hover {
          opacity: 0.8;
        }

        /* Footer */
        .table-footer {
          margin-top: 10px;
          text-align: right;
          font-size: 14px;
          color: #666;
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
      max-width: 494px;
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
      &-content {
        padding: 0 24px 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      &-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 24px 12px;
        gap: 12px;
        .cancel {
          border-radius: 60px;
          background: var(--secondary-main, #6c737f);
          /* elevation/1 */
          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
          padding: 8px 22px;
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
        .save {
          border-radius: 60px;
          background: var(--primary-main, #1d9a6c);
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
      }
    }
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
  width: -webkit-fill-available;
}
`;
export const Field = styled.p`
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

export const TimeContainer = styled.div`
  border-radius: 8px;
  border: 1px solid var(--divider, #dfe4ec);
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 9px 12px;
  flex: 1;
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
      .popup-content {
        h3 {
          margin: 0 0 8px;
        }
      }
    }
  }
`;

export const ShowButton = styled.button`
  background-color: transparent;
  outline: none;
  border: 0;
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
