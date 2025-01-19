import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ArrowRightIcon,
  NextIcon,
  PrevIcon,
  DeleteIcon,
  RightWhiteIcon,
  RightIcon,
  CloseIcon,
} from "@components/icons/svg";
import {
  getFieldDetails,
  getPriceDetails,
  createOrder,
  getPaymentInfoByStadiumId,
  checkPaymentStatus,
  updatePaymentStatus,
} from "@components/services/fieldsService";
import classNames from "classnames";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ScheduleContainer,
  TitleField,
  InputFieldContainer,
  InputField,
  FixedSettingPopup,
  ErrorMessage,
} from "./StyledSchedule";

const Schedule = () => {
  const { id } = useParams();
  const [selectedSlots, setSelectedSlots] = useState({});
  const [stadium, setStadium] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayOfWeek, setDayOfWeek] = useState(
    moment().format("dddd").toLowerCase(),
  );
  const [popupInfo, setPopupInfo] = useState(null);
  const [isFixedBooking, setIsFixedBooking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  let navigate = useNavigate();
  const [isPopupSettingOpen, setIsPopupSettingOpen] = useState(false);
  const [orderType, setOrderType] = useState("single_booking");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState(1);

  // console.log(
  //   isFixedBooking,
  //   duration,
  //   endDate,
  //   startDate,
  //   orderType,
  //   selectedDate,
  //   9999,
  // );
  //   const fields = [
  //     "Sân thường 1",
  //     "Sân thường 2",
  //     "Sân thường 3",
  //     "Sân lớn 1",
  //     "Sân lớn 2",
  //     "Sân lớn 3",
  //   ];

  const timeSlots = Array.from({ length: 48 }, (_, i) =>
    moment("00:00", "HH:mm")
      .add(i * 30, "minutes")
      .format("HH:mm"),
  );
  //   const bookedSlots = {
  //     "Sân thường 1": ["05:00", "05:30", "06:00"],
  //     "Sân thường 2": ["05:00", "05:30"],
  //     "Sân thường 3": ["06:00"],
  //     "Sân lớn 1": ["09:30", "10:00"],
  //     "Sân lớn 2": ["12:00", "12:30", "13:00"],
  //     "Sân lớn 3": [],
  //   };
  const DateTimePicker = ({ selectedDate, setSelectedDate, setDayOfWeek }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const today = moment().startOf("day").toDate();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 6);
    if (isFixedBooking) {
      maxDate.setDate(startDate.getDate());
    }

    const openPopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    const closePopup = () => {
      setIsPopupOpen(false);
    };

    const handleDateChange = (date) => {
      setSelectedDate(date);
      setDayOfWeek(moment(date).format("dddd").toLowerCase());
      closePopup();
    };
    const handleNextDay = () => {
      const nextDate = moment(selectedDate).add(1, "days").toDate();
      if (nextDate <= maxDate) {
        setSelectedDate(nextDate);
        setDayOfWeek(moment(nextDate).format("dddd").toLowerCase());
      }
    };

    const handlePrevDay = () => {
      const prevDate = moment(selectedDate).subtract(1, "days").toDate();
      if (prevDate >= today) {
        setSelectedDate(prevDate);
        setDayOfWeek(moment(prevDate).format("dddd").toLowerCase());
      }
    };

    return (
      <div className="date-time">
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={isFixedBooking ? maxDate : today}
                maxDate={maxDate}
                inline
              />
            </div>
          </div>
        )}
        <div className="select-date-container">
          <button
            className="btn-prev"
            onClick={handlePrevDay}
            disabled={selectedDate <= today || isFixedBooking}
          >
            <PrevIcon />
          </button>
          <div className="select-date">
            <button className="btn-select-time" onClick={openPopup}>
              <CalendarIcon />
              <p className="text-time">
                {selectedDate ? <>{selectedDate.toLocaleDateString()}</> : ""}
              </p>
            </button>
          </div>
          <button
            className="btn-next"
            onClick={handleNextDay}
            disabled={selectedDate >= maxDate || isFixedBooking}
          >
            <NextIcon />
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const resetSlotsAndPopupInfo = () => {
      setSelectedSlots({});
      setPopupInfo({});
    };
    resetSlotsAndPopupInfo();
  }, [selectedDate]);
  useEffect(() => {
    const fetchStadium = async () => {
      try {
        setLoading(true);
        const data = await getFieldDetails(id);
        setStadium(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStadium();
  }, [id]);

  useEffect(() => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const data = await getPriceDetails(
          id,
          dayOfWeek,
          formattedDate,
          orderType,
        );
        setPriceData(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [id, selectedDate, dayOfWeek, orderType]);
  useEffect(() => {
    const getPaymentInfo = async () => {
      try {
        const data = await getPaymentInfoByStadiumId(id);
        setPaymentInfo(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPaymentInfo();
  }, [id]);
  const groupTimeSlotsByField = (slots, selectedSlots, date, fieldNames) => {
    const groupedByField = {};

    slots.forEach((slot) => {
      const [field, time] = slot.split("-");
      if (!groupedByField[field]) groupedByField[field] = [];
      groupedByField[field].push(time);
    });

    const result = Object.entries(groupedByField).map(([field, times]) => {
      const sortedTimes = times.sort(
        (a, b) => moment(a, "HH:mm") - moment(b, "HH:mm"),
      );

      const groupedTimes = [];
      let currentGroup = [sortedTimes[0]];

      for (let i = 1; i < sortedTimes.length; i++) {
        const prevTime = moment(sortedTimes[i - 1], "HH:mm");
        const currentTime = moment(sortedTimes[i], "HH:mm");

        if (currentTime.diff(prevTime, "minutes") === 30) {
          currentGroup.push(sortedTimes[i]);
        } else {
          groupedTimes.push(currentGroup);
          currentGroup = [sortedTimes[i]];
        }
      }
      groupedTimes.push(currentGroup);

      return {
        field,
        name: fieldNames[field],
        times: groupedTimes.map((group) => {
          const start = group[0];
          const end = moment(group[group.length - 1], "HH:mm")
            .add(30, "minutes")
            .format("HH:mm");
          const timeDiff = moment(end, "HH:mm").diff(
            moment(start, "HH:mm"),
            "minutes",
          );
          return {
            start,
            end,
            price: group.reduce(
              (sum, time) => sum + selectedSlots[`${field}-${time}`],
              0,
            ),
            duration: timeDiff,
          };
        }),
      };
    });

    const orders = result.flatMap(({ field, name, times }) =>
      times.map((time) => ({
        orderType: orderType,
        price: time.price * 1000,
        date: date,
        fieldId: parseInt(field, 10),
        fieldName: name,
        beginTime: `${time.start}:00`,
        endTime: `${time.end}:00`,
        duration: time.duration,
      })),
    );

    return { groupedData: result, orders };
  };

  const handleSelect = (field, fieldName, time, price) => {
    const slot = `${field}-${time}`;
    const updatedSlots = { ...selectedSlots };
    const updatedFieldNames = {
      ...popupInfo?.fieldNames,
      [field]: fieldName,
    };

    if (updatedSlots[slot]) {
      delete updatedSlots[slot];
    } else {
      updatedSlots[slot] = price;
    }

    const { groupedData, orders } = groupTimeSlotsByField(
      Object.keys(updatedSlots),
      updatedSlots,
      selectedDate.toLocaleDateString("en-CA"),
      updatedFieldNames,
    );

    const totalPrice =
      Object.values(updatedSlots).reduce(
        (sum, currentPrice) => sum + currentPrice,
        0,
      ) * 1000;
    const totalTime = orders.reduce((sum, order) => sum + order.duration, 0);

    setPopupInfo({
      groupedData,
      totalPrice,
      orders,
      totalTime,
      fieldNames: updatedFieldNames,
    });

    setSelectedSlots(updatedSlots);
  };
  const handleDeleteOrder = (order) => {
    const updatedFieldNames = popupInfo.fieldNames;
    const fieldRemove = popupInfo.groupedData.find(
      (group) => group.field == order.fieldId,
    );
    const slotKeysToRemove = fieldRemove?.times.find(
      (time) =>
        time.start === order.beginTime.slice(0, -3) &&
        time.end === order.endTime.slice(0, -3),
    );
    if (!slotKeysToRemove) return;

    const updatedSlots = { ...selectedSlots };
    let currentTime = moment(slotKeysToRemove.start, "HH:mm");
    const endTime = moment(slotKeysToRemove.end, "HH:mm");

    while (currentTime.isBefore(endTime)) {
      const slotKey = `${order.fieldId}-${currentTime.format("HH:mm")}`;
      delete updatedSlots[slotKey];
      currentTime = currentTime.add(30, "minutes");
    }

    const { groupedData, orders } = groupTimeSlotsByField(
      Object.keys(updatedSlots),
      updatedSlots,
      selectedDate.toLocaleDateString("en-CA"),
      updatedFieldNames,
    );

    const totalPrice =
      Object.values(updatedSlots).reduce(
        (sum, currentPrice) => sum + currentPrice,
        0,
      ) * 1000;
    const totalTime = orders.reduce((sum, order) => sum + order.duration, 0);
    setPopupInfo({
      groupedData,
      totalPrice,
      orders,
      totalTime,
      fieldNames: updatedFieldNames,
    });

    setSelectedSlots(updatedSlots);
  };

  const renderCells = (fieldId, fieldName, unitPrices) =>
    timeSlots.map((time, index) => {
      const slotKey = `${fieldId}-${time}`;
      const isSelected = selectedSlots[slotKey];
      const unitPrice = unitPrices[index];
      const price = unitPrice?.price;
      const status = unitPrice?.status;
      return (
        <td
          key={time}
          className={classNames("cell", {
            selected: isSelected,
            block: status === "block",
            booked: status === "booked",
          })}
          onClick={() => {
            if (status === "available") {
              handleSelect(fieldId, fieldName, time, price);
            }
          }}
        >
          {/* {price} */}
        </td>
      );
    });
  //   const closePopup = () => {
  //     setPopupInfo(null);
  //   };

  const handlePayment = () => {
    setIsBooking(!isBooking);
  };

  const handleOpenFixedBooking = () => {
    setIsPopupSettingOpen(true);
    setStartDate();
  };
  const handleCloseFixedBooking = () => {
    setIsFixedBooking(false);
    setOrderType("single_booking");
    setSelectedDate(new Date());
  };
  const closePopupFixedBooking = () => setIsPopupSettingOpen(false);
  const Payment = () => {
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    const [userName, setUserName] = useState(
      parsedUser ? parsedUser.full_name : "",
    );
    const [userNumber, setUserNumber] = useState(
      parsedUser ? parsedUser.phone_number : "",
    );
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(100);

    const [popupPayment, setPopupPayment] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [orderStatus, setOrderStatus] = useState(null);
    const [qrCode, setQrCode] = useState("");
    const [orderCode, setOrderCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUserName = (e) => {
      setUserName(e.target.value);
    };
    const handleChangeNumber = (e) => {
      setUserNumber(e.target.value);
    };
    const handleChangeNote = (e) => {
      setNote(e.target.value);
    };
    const handleShowDetailOrder = () => {
      setIsShow(!isShow);
    };
    const formatMinutesToHours = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} giờ ${remainingMinutes} phút`;
    };
    const handlePopupPayment = () => {};
    const handleClosePopupPayment = () => {
      setPopupPayment(false);
    };
    const validateForm = () => {
      if (userName.trim().length < 2) {
        return "Họ và tên phải có ít nhất 2 ký tự.";
      }
      const phoneRegex = /^(?:\+84|0)(?:[1-9])[0-9]{8}$/;
      if (!phoneRegex.test(userNumber)) {
        return "Số điện thoại Việt Nam: +84 hoặc 0, tiếp theo là 9 chữ số";
      }
      return null;
    };
    const handleOrders = async (e) => {
      e.preventDefault();
      const validationError = validateForm();
      if (validationError) {
        setErrorMessage(validationError);
        return;
      }

      const deposit = stadium.deposit !== 0 ? paymentMethod : 0;
    try {
      const result = await createOrder(
        stadium.id,
        popupInfo.orders,
        deposit,
        note,
        userName,
        userNumber,
      );

      if (result.data) {
        setPopupPayment(true);
        setQrCode(result?.data?.qrCode);
        setOrderCode(result?.data?.orderCode);
      } else {
        setPopupPayment(false);
        setError(result.message);
        alert(result.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Order bị trùng với người khác. Vui lòng thử lại.");
        window.location.reload();
      } else {
        console.error("Đã xảy ra lỗi:", error);
        alert("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    }
    };
    useEffect(() => {
      if (!popupPayment) return;

      const countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            handleOrderTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const checkPaymentInterval = setInterval(async () => {
        try {
          const data = await checkPaymentStatus(orderCode);
          if (data.data.status === "PAID") {
            clearInterval(countdownInterval);
            clearInterval(checkPaymentInterval);
            setOrderStatus("PAID");
            alert("Thanh toán thành công!");
            const updatedData = await updatePaymentStatus(orderCode, "paid");
            // console.log("Updated Payment Info:", updatedData);
            handleClosePopupPayment();
            window.location.reload();
          }
        } catch (error) {
          console.error("Failed to check payment status:", error);
        }
      }, 10000);

      return () => {
        clearInterval(countdownInterval);
        clearInterval(checkPaymentInterval);
      };
    }, [popupPayment, orderCode]);
    const handleOrderTimeout = async () => {
      if (orderStatus !== "PAID") {
        alert(
          "Đơn hàng đã bị hủy do không thanh toán trong thời gian quy định.",
        );
        const updatedData = await updatePaymentStatus(orderCode, "canceled");
        // console.log("Updated Payment Info:", updatedData);
        handleClosePopupPayment();
        window.location.reload();
      }
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
      <ScheduleContainer className="payment-container">
        <div className="header">
          <div className="title">
            <h3 className="name">Đặt sân</h3>
          </div>
        </div>
        <div className="content-container">
          <div className="content">
            <div className="content-header">
              <p className="title">Thông tin người đặt</p>
              <div className="info">
                <div className="name-number">
                  <InputFieldContainer>
                    <TitleField>Họ và tên</TitleField>
                    <InputField
                      placeholder="Họ và tên"
                      type="text"
                      onChange={handleUserName}
                      value={userName}
                    />
                  </InputFieldContainer>
                  <InputFieldContainer>
                    <TitleField>Số điện thoại</TitleField>
                    <InputField
                      placeholder="Số điện thoại"
                      type="number"
                      onChange={handleChangeNumber}
                      value={userNumber}
                    />
                  </InputFieldContainer>
                </div>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <InputFieldContainer>
                  <TitleField> Ghi chú (cho chủ sân)</TitleField>
                  <InputField
                    placeholder="Nhập ghi chú"
                    type="text"
                    onChange={handleChangeNote}
                    value={note}
                  />
                </InputFieldContainer>
              </div>
            </div>
            <div className="content-info">
              <p className="title">Thông tin đặt lịch</p>
              <div className="info">
                <div className="stadium">
                  <span className="name-title">Tên sân:</span>
                  <span>{stadium.name}</span>
                </div>
                <div className="address">
                  <span className="name-title">Địa chỉ:</span>
                  <span>{stadium.address}</span>
                </div>
                <div className="detail-info">
                  <div className="date">
                    <span className="name-title">
                      {isFixedBooking ? "Lịch cố định:" : "Ngày:"}
                    </span>
                    <span>
                      {isFixedBooking
                        ? `${moment(startDate).format("YYYY/MM/DD")} - ${moment(endDate).format("YYYY/MM/DD")}`
                        : moment(selectedDate).format("YYYY/MM/DD")}
                    </span>
                  </div>
                  {popupInfo?.orders &&
                    popupInfo?.orders.length > 0 &&
                    popupInfo?.orders.map((order, index) => {
                      return (
                        <div className="order-item" key={index}>
                          <div>
                            <span className="title">
                              {index + 1}. {order.fieldName}:
                            </span>
                            <span className="time">
                              {order.beginTime} - {order.endTime}
                            </span>
                          </div>
                          <div>
                            <span className="price">
                              {order.price.toLocaleString("vi-VN")} đ
                            </span>
                            <button
                              className="delete"
                              onClick={() => handleDeleteOrder(order)}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="line"></div>
                <div className="overview">
                  <div className="total-time">
                    <span className="title">Tổng giờ:</span>
                    <span className="time">
                      {formatMinutesToHours(popupInfo?.totalTime)}
                    </span>
                  </div>
                  <div className="total-price">
                    <span className="title">Tổng tiền:</span>
                    <span>
                      {(popupInfo?.totalPrice).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <div className="payment-method">
                    <span className="title">Phương thức thanh toán</span>
                    <div>
                      {stadium.deposit === 0 ? (
                        <p>Thanh toán tại sân</p>
                      ) : (
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={stadium.deposit}
                              checked={paymentMethod === stadium.deposit}
                              onChange={() => setPaymentMethod(stadium.deposit)}
                            />
                            Thanh toán trước {stadium.deposit}%
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="100"
                              checked={paymentMethod === 100}
                              onChange={() => setPaymentMethod(100)}
                            />
                            Thanh toán hết
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="must-payment">
                    <span className="title">Số tiền phải trả</span>
                    <span className="price">
                      {(
                        popupInfo?.totalPrice * (paymentMethod / 100 || 1)
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-actions">
              <button className="back" onClick={handlePayment}>
                Quay lại
              </button>
              <button className="confirm-payment" onClick={handleOrders}>
                Xác nhận và thanh toán <RightWhiteIcon />
              </button>
            </div>
          </div>
        </div>
        {popupPayment && (
          <div className="dialog-container">
            <div className="dialog">
              <div className="dialog-header">
                <span className="title">Thanh toán</span>
                <button className="close" onClick={handleClosePopupPayment}>
                  <CloseIcon />
                </button>
              </div>
              <div className="dialog-content">
                <span className="title">Quét mã QR hoặc nhập thông tin</span>
                <div className="bank-info">
                  <QRCode value={qrCode} size={155} />
                  <div className="info">
                    <div className="info-item">
                      <span className="title">Chủ tài khoản</span>
                      <span className="value">{paymentInfo?.full_name}</span>
                    </div>
                    <div className="info-item">
                      <span className="title">Số tài khoản</span>
                      <span className="value">{paymentInfo?.bank_account}</span>
                    </div>
                    <div className="info-item">
                      <span className="title">Ngân hàng</span>
                      <span className="value">{paymentInfo?.bank}</span>
                    </div>
                    <div className="info-item">
                      <span className="title">Nội dung chuyển khoản</span>
                      <span className="value">{`<Tên + Số điện thoại>`}</span>
                    </div>
                  </div>
                </div>
                <div className="order-detail">
                  <div className="title">
                    Chi tiết đặt
                    <button
                      className={isShow ? "show" : ""}
                      onClick={handleShowDetailOrder}
                    >
                      <RightIcon />
                    </button>
                  </div>
                  {isShow && (
                    <div className="order-detail-content">
                      <div className="stadium-info">
                        <div className="stadium-name">
                          <span className="title">Tên sân:</span>
                          <span className="value">{stadium.name}</span>
                        </div>
                        <div className="stadium-address">
                          <span className="title">Địa chỉ:</span>
                          <span className="value">{stadium.address}</span>
                        </div>
                      </div>
                      <div className="order-detail">
                        <div className="date">
                          <span className="name-title">Ngày: </span>
                          <span>
                            {selectedDate
                              .toLocaleDateString("sv-SE")
                              .replace(/-/g, "/")}
                          </span>
                        </div>
                        {popupInfo?.orders &&
                          popupInfo?.orders.length > 0 &&
                          popupInfo?.orders.map((order, index) => {
                            return (
                              <div className="order-item" key={index}>
                                <div>
                                  <span className="title">
                                    {index + 1}. {order.fieldName}:
                                  </span>
                                  <span className="time">
                                    {order.beginTime} - {order.endTime}
                                  </span>
                                </div>
                                <div>
                                  <span className="price">
                                    {order.price.toLocaleString("vi-VN")} đ
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="price-info">
                  <div className="total-price">
                    <span className="title">Thành tiền</span>
                    <span className="value">
                      {(popupInfo?.totalPrice).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <div className="deposit">
                    <span className="title">Cọc trước</span>
                    <span className="value">
                      {(
                        popupInfo?.totalPrice * (paymentMethod / 100 || 1)
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </span>
                  </div>
                </div>
                <div className="message">
                  Vui lòng chuyển khoản{" "}
                  <strong>
                    {(
                      popupInfo?.totalPrice * (paymentMethod / 100 || 1)
                    ).toLocaleString("vi-VN")}{" "}
                  </strong>
                  đ trong vòng <strong>5 phút</strong> để hoàn tất đặt lịch!
                  <br />
                  Đơn hàng của bạn còn được giữ chỗ trong:
                  <br />
                  <span className="time">{formatTime(timeLeft)}</span>
                </div>
              </div>
              {/* <div className="dialog-footer">
                <button className="cancel">Hủy bỏ</button>
                <button className="confirm">Xác nhận đã chuyển khoản</button>
              </div> */}
            </div>
          </div>
        )}
      </ScheduleContainer>
    );
  };
  const FixedSetting = () => {
    const [tempOrderType, setTempOrderType] = useState(orderType);
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const [tempDuration, setTempDuration] = useState(duration);

    const updateTempEndDate = (start, months) => {
      if (start) {
        const updatedEndDate = new Date(start);
        updatedEndDate.setMonth(updatedEndDate.getMonth() + months);
        setTempEndDate(updatedEndDate);

        if (months === 1) {
          setTempOrderType("one_month");
        } else if (months === 6) {
          setTempOrderType("six_months");
        } else if (months === 12) {
          setTempOrderType("one_year");
        }
      }
    };
    const handleTempStartDateChange = (date) => {
      setTempStartDate(date);
      updateTempEndDate(date, tempDuration);
    };

    const handleTempDurationChange = (value) => {
      const months = parseInt(value, 10);
      setTempDuration(months);
      updateTempEndDate(tempStartDate, months);
    };
    const handleSaveFixedBooking = () => {
      setOrderType(tempOrderType);
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
      setDuration(tempDuration);
      setIsFixedBooking(true);
      setSelectedDate(tempStartDate);
      closePopupFixedBooking();
    };
    return (
      <FixedSettingPopup className="popup-overlay">
        <div className="popup-content">
          <h3 className="title">Đặt lịch cố định</h3>
          <button className="btn-close" onClick={closePopupFixedBooking}>
            <CloseIcon />
          </button>
          <div className="select-duration">
            <label>Chọn khoảng thời gian cố định:</label>
            <div className="time-options">
              <div className="time-item">
                <input
                  type="radio"
                  name="duration"
                  value="1"
                  checked={tempDuration === 1}
                  onChange={(e) => handleTempDurationChange(e.target.value)}
                />
                1 tháng
              </div>
              <div className="time-item">
                <input
                  type="radio"
                  name="duration"
                  value="6"
                  checked={tempDuration === 6}
                  onChange={(e) => handleTempDurationChange(e.target.value)}
                />{" "}
                6 tháng
              </div>
              <div className="time-item">
                <input
                  type="radio"
                  name="duration"
                  value="12"
                  checked={tempDuration === 12}
                  onChange={(e) => handleTempDurationChange(e.target.value)}
                />{" "}
                1 năm
              </div>
            </div>
          </div>
          <div className="select-time">
            <label>Thời gian:</label>
            <div className="time-container">
              <InputFieldContainer>
                <TitleField>Bắt đầu</TitleField>
                <DatePicker
                  selected={tempStartDate}
                  onChange={handleTempStartDateChange}
                  minDate={new Date()}
                  placeholderText="Chọn ngày bắt đầu"
                />
                <CalendarIcon />
              </InputFieldContainer>
              <InputFieldContainer>
                <TitleField>Kết thúc</TitleField>
                <DatePicker
                  selected={tempEndDate}
                  onChange={(date) => setTempEndDate(date)}
                  disabled
                  placeholderText="Ngày kết thúc "
                />
                <CalendarIcon />
              </InputFieldContainer>
            </div>
          </div>
          {/* <div className="note">
            <InputFieldContainer>
              <TitleField>Ghi chú (cho chủ sân): </TitleField>
              <InputField
                placeholder="Nhập ghi chú "
                type="text"
                onChange={(e) => setNote(e.target.value)}
              />
            </InputFieldContainer>
          </div> */}
          <div className="actions">
            <button onClick={closePopupFixedBooking} className="btn-cancel">
              Hủy
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={tempStartDate ? false : true}
              onClick={() => {
                handleSaveFixedBooking();
                closePopupFixedBooking();
              }}
            >
              Lưu cài đặt
            </button>
          </div>
        </div>
      </FixedSettingPopup>
    );
  };
  return isBooking
    ? stadium && <Payment />
    : stadium && (
        <ScheduleContainer className="schedule-container">
          <div className="header">
            <div className="title">
              <button className="close-btn" onClick={() => navigate(-1)}>
                <ArrowLeftIcon color="#111927" />
                Quay lại
              </button>
              <h3 className="name">Lịch sân - {stadium?.name}</h3>
            </div>
            <button
              className="fixed-booking"
              onClick={
                isFixedBooking
                  ? handleCloseFixedBooking
                  : handleOpenFixedBooking
              }
            >
              {isFixedBooking && orderType !== "single_booking"
                ? "Đặt lịch trong ngày"
                : "Đặt lịch cố định"}
            </button>
          </div>
          <div className="content-container">
            <div className="content">
              <div className="content-header">
                <DateTimePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setDayOfWeek={setDayOfWeek}
                />
                <div className="unit-status">
                  <div className="unit-item">
                    <div className="color white"></div>
                    <span className="text-status">Đang trống</span>
                  </div>
                  <div className="unit-item">
                    <div className="color green"></div>
                    <span className="text-status">Đang chọn</span>
                  </div>
                  <div className="unit-item">
                    <div className="color grey"></div>
                    <span className="text-status">Khóa</span>
                  </div>
                  <div className="unit-item">
                    <div className="color red"></div>
                    <span className="text-status">Đã đặt</span>
                  </div>
                </div>
                {popupInfo &&
                  selectedSlots &&
                  Object.keys(selectedSlots).length > 0 && (
                    <div className="popup-order-overlay">
                      <div className="popup-order-content">
                        <div className="info">
                          <span>Thời gian đã chọn: </span>
                          <div className="orders">
                            {popupInfo.groupedData.map((group, index) => (
                              <div key={index}>
                                <ul>
                                  {group.times
                                    .map(
                                      (time, idx) =>
                                        `${time.start} - ${time.end}`,
                                    )
                                    .join(", ")}
                                </ul>
                                {`(${group.name})`}
                                {index < popupInfo.groupedData.length - 1 &&
                                  ", "}
                              </div>
                            ))}
                          </div>
                        </div>
                        {isFixedBooking && (
                          <div className="info">
                            <span>Cố định: </span>
                            <div className="orders">
                              <div>
                                {duration} tháng ({" "}
                                {moment(startDate).format("YYYY/MM/DD")} -
                                {moment(endDate).format("YYYY/MM/DD")} )
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="payment">
                          <div className="total-price">
                            <span className="title">Tổng tiền:</span>
                            <span className="price">
                              {popupInfo.totalPrice.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                          <button
                            className="btn-payment"
                            onClick={handlePayment}
                          >
                            Thanh toán <ArrowRightIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Sân</th>
                      {timeSlots.map((time) => (
                        <th key={time}>{time}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {priceData?.map((field) => (
                      <tr key={field.fieldId}>
                        <td>{field.fieldName}</td>
                        {renderCells(
                          field.fieldId,
                          field.fieldName,
                          field.unit,
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {isPopupSettingOpen && <FixedSetting />}
        </ScheduleContainer>
      );
};

export default Schedule;
