import React, { useState, useEffect } from "react";
import {
  AccountContainer,
  InputFieldContainer,
  TitleField,
  Field,
  InputField,
  TimeContainer,
  ShowButton,
  ErrorMessage,
} from "./StyledAccount";
import { CalendarIcon, CloseIcon, EyeIcon } from "@components/icons/svg";
import DatePicker from "react-datepicker";
import {
  editPasswordById,
  editNameById,
  editNumberById,
  getUserInfoById,
} from "@components/services/fieldsService";
const AccountContent = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [changePassword, setChangePassword] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState("");

  const handleChangePassword = () => setChangePassword(true);
  const handleChangeName = () => setChangeName(true);
  const handleChangeNumber = () => setChangePhoneNumber(true);
  const handleClose = () => {
    setChangePassword(false);
    setChangeName(false);
    setChangePhoneNumber(false);
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoById(savedUser.player_id);
        setUser(data?.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserInfo();
  }, []);

  const DateTimePicker = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const openPopup = () => {
      setIsPopupOpen(true);
    };
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setIsPopupOpen(false);
    };

    return (
      <div className="date-time">
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div>
                <h3>Chọn ngày</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  inline
                />
              </div>
            </div>
          </div>
        )}
        <p className="text-time">
          {selectedDate ? <>{selectedDate.toLocaleDateString()}</> : "Tất cả"}
        </p>
        <button className="btn-select-time" onClick={openPopup}>
          <CalendarIcon />
        </button>
      </div>
    );
  };
  const dummyData = [
    {
      id: 1,
      order_type: "single_booking",
      date: "2024-12-09T17:00:00.000Z",
      begin_time: "16:00:00",
      end_time: "17:00:00",
      price: 100,
      created_at: "2024-12-10T11:04:18.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 2,
      field_id: 2,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 2,
      order_type: "single_booking",
      date: "2024-12-09T17:00:00.000Z",
      begin_time: "16:00:00",
      end_time: "17:00:00",
      price: 100,
      created_at: "2024-12-10T11:06:07.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 2,
      field_id: 1,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 3,
      order_type: "single_booking",
      date: "2024-12-11T17:00:00.000Z",
      begin_time: "08:00:00",
      end_time: "08:30:00",
      price: 40,
      created_at: "2024-12-13T17:51:52.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 6,
      field_id: 4,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 4,
      order_type: "single_booking",
      date: "2024-12-11T17:00:00.000Z",
      begin_time: "08:00:00",
      end_time: "08:30:00",
      price: 40,
      created_at: "2024-12-13T17:58:53.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 7,
      field_id: 4,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 5,
      order_type: "single_booking",
      date: "2024-12-11T17:00:00.000Z",
      begin_time: "17:00:00",
      end_time: "18:30:00",
      price: 120,
      created_at: "2024-12-13T17:58:53.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 7,
      field_id: 4,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 6,
      order_type: "single_booking",
      date: "2024-12-11T17:00:00.000Z",
      begin_time: "09:00:00",
      end_time: "09:30:00",
      price: 40,
      created_at: "2024-12-13T18:00:51.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 8,
      field_id: 3,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 7,
      order_type: "single_booking",
      date: "2024-12-11T17:00:00.000Z",
      begin_time: "17:00:00",
      end_time: "19:30:00",
      price: 150,
      created_at: "2024-12-13T18:00:51.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 8,
      field_id: 2,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
    {
      id: 8,
      order_type: "single_booking",
      date: "2024-12-11T17:00:00.000Z",
      begin_time: "20:00:00",
      end_time: "22:30:00",
      price: 120,
      created_at: "2024-12-13T18:00:51.000Z",
      updated_at: "2024-12-16T03:25:18.000Z",
      order_id: 8,
      field_id: 3,
      order_status: "pending",
      stadium_id: 1,
      player_id: 1,
    },
  ];
  const BookingTable = () => {
    // Map status codes to display labels and colors
    const statusMap = {
      pending: { label: "CHỜ XỬ LÝ", className: "status-pending" },
      success: { label: "THÀNH CÔNG", className: "status-success" },
      cancelled: { label: "ĐÃ HỦY", className: "status-cancelled" },
    };

    return (
      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Thời gian</th>
              <th>Tên sân</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => {
              const status = statusMap[item.order_status] || {
                label: "KHÔNG XÁC ĐỊNH",
                className: "status-unknown",
              };

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(item.date).toLocaleDateString()} -{" "}
                    {item.begin_time}
                  </td>
                  <td>Sân {item.field_id}</td>
                  <td>{item.price} VND</td>
                  <td>
                    <span className={`status-label ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td>
                    <button className="btn-detail">Chi tiết</button>
                    <button className="btn-cancel">Hủy đặt sân</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-footer">
          Rows per page: <strong>10</strong> | 1-5 of {dummyData.length}
        </div>
      </div>
    );
  };
  const Dialog = () => {
    const [visibility, setVisibility] = useState({
      isHidden: true,
      isRePassHidden: true,
      isOldHidden: true,
    });

    const [inputs, setInputs] = useState({
      password: "",
      rePassword: "",
      oldPassword: "",
      fullName: "",
      phoneNumber: "",
    });

    const toggleVisibility = (field) => {
      setVisibility({ ...visibility, [field]: !visibility[field] });
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    };

    const validateForm = () => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(inputs.password)) {
        return "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.";
      }
      if (inputs.password !== inputs.rePassword) {
        return "Mật khẩu không khớp.";
      }
      return null;
    };

    const handleSubmit = async (type) => {
      let result;
      switch (type) {
        case "password":
          const validationError = validateForm();
          if (validationError) return setError(validationError);
          result = await editPasswordById(
            savedUser?.player_id,
            inputs.oldPassword,
            inputs.password,
          );
          break;
        case "name":
          result = await editNameById(savedUser.player_id, inputs.fullName);
          break;
        case "phoneNumber":
          result = await editNumberById(
            savedUser?.player_id,
            inputs.phoneNumber,
          );
          break;
        default:
          return;
      }
      if (result.data) {
        alert("Change success");
        setChangePassword(false);
        setChangeName(false);
        setChangePhoneNumber(false);
      } else {
        setError(result.message);
      }
    };

    return (
      <div className="dialog-container">
        <div className="dialog">
          <div className="dialog-header">
            <span className="title">
              {changePassword
                ? "Đổi mật khẩu"
                : changeName
                  ? "Sửa tên"
                  : changePhoneNumber
                    ? "Sửa số điện thoại"
                    : ""}
            </span>
            <button className="close" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="dialog-content">
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {changePassword && (
              <>
                {["oldPassword", "password", "rePassword"].map(
                  (field, index) => (
                    <InputFieldContainer key={field}>
                      <TitleField>
                        {field === "oldPassword"
                          ? "Mật khẩu cũ"
                          : field === "password"
                            ? "Mật khẩu"
                            : "Nhập lại mật khẩu"}
                      </TitleField>
                      <InputField
                        placeholder={
                          field === "oldPassword"
                            ? "Mật khẩu cũ"
                            : field === "password"
                              ? "Mật khẩu"
                              : "Nhập lại mật khẩu"
                        }
                        type={
                          visibility[`is${field}Hidden`] ? "password" : "text"
                        }
                        name={field}
                        value={inputs[field]}
                        onChange={handleInputChange}
                      />
                      <ShowButton
                        type="button"
                        onClick={() => toggleVisibility(`is${field}Hidden`)}
                      >
                        <EyeIcon />
                      </ShowButton>
                    </InputFieldContainer>
                  ),
                )}
              </>
            )}

            {changeName && (
              <InputFieldContainer>
                <TitleField>Họ và tên</TitleField>
                <InputField
                  placeholder="Họ và tên"
                  name="fullName"
                  value={inputs.fullName}
                  onChange={handleInputChange}
                />
              </InputFieldContainer>
            )}

            {changePhoneNumber && (
              <InputFieldContainer>
                <TitleField>Số điện thoại</TitleField>
                <InputField
                  placeholder="Số điện thoại"
                  name="phoneNumber"
                  value={inputs.phoneNumber}
                  onChange={handleInputChange}
                />
              </InputFieldContainer>
            )}
          </div>

          <div className="dialog-actions">
            <button className="cancel" onClick={handleClose}>
              Hủy bỏ
            </button>
            <button
              className="save"
              onClick={() =>
                handleSubmit(
                  changePassword
                    ? "password"
                    : changeName
                      ? "name"
                      : changePhoneNumber
                        ? "phoneNumber"
                        : "",
                )
              }
            >
              Lưu cài đặt
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AccountContainer>
      <div className="header">
        <div className="title">
          <h3 className="name">Quản lý tài khoản</h3>
        </div>
      </div>
      <div className="account-content">
        <div className="content-header">
          <p className="title">Thông tin cá nhân</p>
          <div className="info">
            <div>
              <div>
                <InputFieldContainer>
                  <TitleField>Email</TitleField>
                  <Field> {user ? user.email : savedUser?.email}</Field>
                </InputFieldContainer>
              </div>
              <div className="fullName">
                <InputFieldContainer>
                  <TitleField>Họ và tên</TitleField>
                  <Field> {user ? user.full_name : savedUser?.full_name}</Field>
                </InputFieldContainer>
                <button className="edit" onClick={handleChangeName}>
                  Sửa
                </button>
              </div>
            </div>
            <div>
              <div className="password">
                <InputFieldContainer>
                  <TitleField>Mật khẩu</TitleField>
                  <Field> ******</Field>
                </InputFieldContainer>
                <button className="change" onClick={handleChangePassword}>
                  Đổi mật khẩu
                </button>
              </div>
              <div className="phoneNumber">
                <InputFieldContainer>
                  <TitleField>Số điện thoại</TitleField>
                  <Field>
                    {user ? user.phone_number : savedUser?.phone_number}
                  </Field>
                </InputFieldContainer>
                <button className="edit" onClick={handleChangeNumber}>
                  Sửa
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="content-history">
          <div className="history-header">
            <div className="title">
              <p className="text-title">Lịch sử đặt sân</p>
              <p className="subtitle">Số lượng giao dịch: {dummyData.length}</p>
            </div>
            <TimeContainer>
              <span>Thời gian</span>
              <DateTimePicker />
            </TimeContainer>
          </div>
          <BookingTable />
        </div>
      </div>
      {(changePassword || changeName || changePhoneNumber) && <Dialog />}
    </AccountContainer>
  );
};

export default AccountContent;
