import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ArrowRightIcon,
  NextIcon,
  PrevIcon,
} from "@components/icons/svg";
import {
  getFieldDetails,
  getPriceDetails,
} from "@components/services/fieldsService";
import classNames from "classnames";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleContainer } from "./StyledSchedule";
const Schedule = () => {
  const { id } = useParams();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [stadium, setStadium] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayOfWeek, setDayOfWeek] = useState(
    moment().format("dddd").toLowerCase(),
  );
  const [popupInfo, setPopupInfo] = useState(null);
  let navigate = useNavigate();

  // Dữ liệu các sân
  const fields = [
    "Sân thường 1",
    "Sân thường 2",
    "Sân thường 3",
    "Sân lớn 1",
    "Sân lớn 2",
    "Sân lớn 3",
  ];

  // Tạo thời gian từ 5:00 đến 13:00 với step 30 phút
  const timeSlots = Array.from({ length: 48 }, (_, i) =>
    moment("00:00", "HH:mm")
      .add(i * 30, "minutes")
      .format("HH:mm"),
  );

  // Trạng thái các ô (mô phỏng)
  const bookedSlots = {
    "Sân thường 1": ["05:00", "05:30", "06:00"],
    "Sân thường 2": ["05:00", "05:30"],
    "Sân thường 3": ["06:00"],
    "Sân lớn 1": ["09:30", "10:00"],
    "Sân lớn 2": ["12:00", "12:30", "13:00"],
    "Sân lớn 3": [],
  };
  const DateTimePicker = ({ selectedDate, setSelectedDate, setDayOfWeek }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const today = moment().startOf("day").toDate();
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
      setSelectedDate(nextDate);
      setDayOfWeek(moment(nextDate).format("dddd").toLowerCase());
    };

    const handlePrevDay = () => {
      const prevDate = moment(selectedDate).subtract(1, "days").toDate();
      if (prevDate >= today) {
        setSelectedDate(prevDate);
        setDayOfWeek(moment(prevDate).format("dddd").toLowerCase());
      }
    };

    console.log(selectedDate);
    return (
      <div className="date-time">
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={today}
                inline
              />
            </div>
          </div>
        )}
        <div className="select-date-container">
          <button
            className="btn-prev"
            onClick={handlePrevDay}
            disabled={selectedDate <= today}
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
          <button className="btn-next" onClick={handleNextDay}>
            <NextIcon />
          </button>
        </div>
      </div>
    );
  };
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
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const data = await getPriceDetails(id, dayOfWeek);
        setPriceData(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [id, dayOfWeek]);
  const groupTimeSlotsByField = (slots) => {
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
        times: groupedTimes.map((group) => ({
          start: group[0],
          end: moment(group[group.length - 1], "HH:mm")
            .add(30, "minutes")
            .format("HH:mm"),
        })),
      };
    });

    return result;
  };

  // Xử lý chọn slot
  const handleSelect = (field, time, price) => {
    const slot = `${field}-${time}`;
    const newSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter((item) => item !== slot)
      : [...selectedSlots, slot];

    const groupedData = groupTimeSlotsByField(newSlots);

    const totalPrice = newSlots.length * price;

    setPopupInfo({
      groupedData,
      totalPrice,
    });

    setSelectedSlots(newSlots);
  };

  const renderCells = (fieldName, unitPrices) =>
    timeSlots.map((time, index) => {
      const isSelected = selectedSlots.includes(`${fieldName}-${time}`);
      const price = unitPrices[index];
      return (
        <td
          key={time}
          className={classNames("cell", {
            selected: isSelected,
          })}
          onClick={() => handleSelect(fieldName, time, price)}
        ></td>
      );
    });
  //   const closePopup = () => {
  //     setPopupInfo(null);
  //   };

  console.log(stadium, 999);
  return (
    stadium && (
      <ScheduleContainer className="schedule-container">
        <div className="header">
          <div className="title">
            <button className="close-btn" onClick={() => navigate(-1)}>
              <ArrowLeftIcon />
              Quay lại
            </button>
            <h3 className="name">Lịch sân - {stadium.name}</h3>
          </div>
          <button
            className="fixed-booking"
            onClick={() => console.log(selectedSlots)}
          >
            Đặt lịch cố định
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
              {popupInfo && (
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
                                  (time, idx) => `${time.start} - ${time.end}`,
                                )
                                .join(", ")}
                            </ul>
                            {`(${group.field})`}
                            {index < popupInfo.groupedData.length - 1 && ", "}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="payment">
                      <div className="total-price">
                        <span className="title">Tổng tiền:</span>
                        <span className="price">{popupInfo.totalPrice}k</span>
                      </div>
                      <button
                        className="btn-payment"
                        onClick={() => console.log("payment")}
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
                      {renderCells(field.fieldName, field.unitPrice)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ScheduleContainer>
    )
  );
};

export default Schedule;
