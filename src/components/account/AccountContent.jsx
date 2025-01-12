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
  OrderDetailContainer,
} from "./StyledAccount";
import Cookies from "js-cookie";
import {
  CalendarIcon,
  CloseIcon,
  EyeIcon,
  Success,
  ArrowLeftIcon,
} from "@components/icons/svg";
import DatePicker from "react-datepicker";
import {
  editPasswordById,
  editNameById,
  editNumberById,
  getUserInfoById,
  getOrderHistory,
} from "@components/services/fieldsService";
import { MdPendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const AccountContent = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [changePassword, setChangePassword] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState("");
  const [history, setHistory] = useState();

  const handleChangePassword = () => setChangePassword(true);
  const handleChangeName = () => setChangeName(true);
  const handleChangeNumber = () => setChangePhoneNumber(true);
  const handleClose = () => {
    setChangePassword(false);
    setChangeName(false);
    setChangePhoneNumber(false);
  };
  const jwt = Cookies.get("jwt");

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

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await getOrderHistory(jwt);
        setHistory(data?.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOrderHistory();
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

  const BookingTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const totalRows = history?.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = history?.slice(startIndex, endIndex);
    const [orderDetail, setOrderDetail] = useState();
    const [isShowDetail, setIsShowDetail] = useState(false);

    const statusMap = {
      pending: { label: "CHỜ XỬ LÝ", className: "status-pending" },
      success: { label: "THÀNH CÔNG", className: "status-success" },
      canceled: { label: "ĐÃ HỦY", className: "status-canceled" },
    };

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
    const handleDetail = (item) => {
      console.log(item);
      setIsShowDetail(true);
      setOrderDetail(item);
    };
    const handleClose = () => {
      setIsShowDetail(false);
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
            {currentData?.length > 0 &&
              currentData.map((item, index) => {
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
                      <button
                        className="btn-detail"
                        onClick={() => handleDetail(item)}
                      >
                        Chi tiết
                      </button>
                      <button className="btn-cancel">Hủy đặt sân</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="table-footer">
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        {isShowDetail && (
          <OrderDetail item={orderDetail} handleClose={handleClose} />
        )}
      </div>
    );
  };
  const Dialog = ({ item }) => {
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
  const OrderDetail = ({ item, handleClose }) => {
    const renderStatusIcon = (status) => {
      if (status === "pending") return <MdPendingActions color="#fff" />;
      else if (status === "canceled") return <FcCancel />;
      else return <Success />;
    };
    const renderStatusMessage = (status) => {
      if (status === "pending") return "Đơn hàng đang được xử lý!";
      else if (status === "canceled") return "Sân đã bị huỷ!";
      else return "Bạn đã đặt sân thành công!";
    };
    return (
      <OrderDetailContainer>
        <div className="order-detail">
          <button className="btn-close" onClick={handleClose}>
            <ArrowLeftIcon color="#4d5761" /> Quay lại
          </button>
          <div className={`order-header ${item.order_status}`}>
            <div className={`status-icon ${item.order_status}`}>
              {renderStatusIcon(item.order_status)}
            </div>
            <div className="status-message">
              {renderStatusMessage(item.order_status)}
            </div>
          </div>
          <div className="content-info">
            <p className="title">Thông tin đặt lịch</p>
            <div className="info">
              <div className="stadium">
                <span className="name-title">Tên sân:</span>
                <span>{item.name}</span>
              </div>
              <div className="address">
                <span className="name-title">Địa chỉ:</span>
                <span>{item.address}</span>
              </div>
              <div className="detail-info">
                <div className="date">
                  <span className="name-title">
                    {item.order_type === "single_booking"
                      ? "Ngày:"
                      : "Lịch cố định:"}
                  </span>
                  <span></span>
                </div>
                <div className="order-item">
                  <div>
                    <span className="title"></span>
                    <span className="time"></span>
                  </div>
                  <div>
                    <span className="price"></span>
                  </div>
                </div>
              </div>
              <div className="line"></div>
              <div className="overview">
                <div className="total-time">
                  <span className="title">Tổng giờ:</span>
                  <span className="time"></span>
                </div>
                <div className="total-price">
                  <span className="title">Tổng tiền:</span>
                  <span></span>
                </div>
                <div className="payment-method">
                  <span className="title">Phương thức thanh toán</span>
                </div>
                <div className="must-payment">
                  <span className="title">Số tiền phải trả</span>
                  <span className="price"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OrderDetailContainer>
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
              <p className="subtitle">Số lượng giao dịch: {history?.length}</p>
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
