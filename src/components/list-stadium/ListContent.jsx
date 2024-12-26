import {
  CalendarIcon,
  FootballIcon,
  SearchIconGrey,
} from "@components/icons/svg";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import {
  AddressIcon,
  ArrowLeftIcon,
  BadmintonIcon,
  BasketballIcon,
  BookIcon,
  ClosedDoor,
  MultipleIcon,
  OpenDoor,
  TelIcon,
  TennisIcon,
  TimeIcon,
  VolleyballIcon,
} from "../icons/svg";
import {
  CategoryItemContainer,
  CategoryListContainer,
  LeftBarContainer,
  LeftBarTitle,
  ListContainer,
  ListContentContainer,
  ListHeaderContainer,
  ListHeaderTitle,
  PopupBarContainer,
  RateDisplayContainer,
  RatingCount,
  RightBarContainer,
  SearchContainer,
  StadiumItemContainer,
  StarsContainer,
  TimeContainer,
} from "./StyledList";
import { debounce } from "lodash";
import { getSportsFields } from "@components/services/fieldsService";
const ListContent = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getSportsFields(type, name);
        setFields(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [type, name]);
  const DateTimePicker = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState({
      date: null,
      time: "",
    });

    const togglePopup = () => setIsPopupOpen((prev) => !prev);

    const handleDateChange = (date) => {
      setSelectedDateTime((prev) => ({ ...prev, date }));
    };

    const handleTimeChange = (e) => {
      const time = e.target.value;
      setSelectedDateTime((prev) => ({ ...prev, time }));
    };

    const closePopup = () => setIsPopupOpen(false);
    return (
      <div className="date-time">
        {isPopupOpen && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>Chọn ngày và giờ</h3>
              <div className="date-picker">
                <DatePicker
                  selected={selectedDateTime.date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  inline
                  minDate={new Date()}
                />
              </div>
              <div className="time-picker">
                <label htmlFor="time">Giờ:</label>
                <input
                  type="time"
                  id="time"
                  value={selectedDateTime.time}
                  onChange={handleTimeChange}
                />
              </div>
              <button className="btn-close" onClick={closePopup}>
                Đóng
              </button>
            </div>
          </div>
        )}
        <p className="text-time">
          {selectedDateTime.date && selectedDateTime.time ? (
            <>
              {selectedDateTime.date.toLocaleDateString()}{" "}
              {selectedDateTime.time}
            </>
          ) : (
            "Tất cả"
          )}
        </p>
        <button className="btn-select-time" onClick={togglePopup}>
          <CalendarIcon />
        </button>
      </div>
    );
  };

  const ListHeader = ({ value, onSearch }) => {
    const [localName, setLocalName] = useState(value);
    useEffect(() => {
      const debouncedSearch = debounce(() => {
        onSearch(localName);
      }, 1000);

      debouncedSearch();
      return () => debouncedSearch.cancel();
    }, [localName, onSearch]);
    const handleInputChange = (e) => {
      setLocalName(e.target.value);
    };
    return (
      <ListHeaderContainer>
        <ListHeaderTitle>Danh sách sân</ListHeaderTitle>
        <SearchContainer>
          <span>Tìm kiếm</span>
          <div>
            <input
              type="text"
              placeholder="Tìm tên sân..."
              value={localName}
              onChange={handleInputChange}
            />
            <button>
              <SearchIconGrey />
            </button>
          </div>
        </SearchContainer>
        <TimeContainer>
          <span>Thời gian</span>
          <DateTimePicker />
        </TimeContainer>
      </ListHeaderContainer>
    );
  };
  const ListContent = () => {
    const LeftBar = () => {
      const ListCategory = () => {
        const handleCategoryClick = (id, type) => {
          setActiveCategoryId(id);
          setType(type);
        };
        const category = [
          {
            id: 1,
            icon: FootballIcon,
            name: "Sân banh",
            onCount: 112,
            offCount: 7,
            type: "football",
          },
          {
            id: 2,
            icon: BadmintonIcon,
            name: "Sân cầu lông",
            onCount: 112,
            offCount: 7,
            type: "badminton",
          },
          {
            id: 3,
            icon: TennisIcon,
            name: "Sân tennis",
            onCount: 112,
            offCount: 7,
            type: "tennis",
          },
          {
            id: 4,
            icon: VolleyballIcon,
            name: "Sân bóng chuyền",
            onCount: 112,
            offCount: 7,
            type: "volleyball",
          },
          {
            id: 5,
            icon: BasketballIcon,
            name: "Sân bóng rổ",
            onCount: 112,
            offCount: 7,
            type: "basketball",
          },
          {
            id: 6,
            icon: MultipleIcon,
            name: "Sân phức hợp",
            onCount: 112,
            offCount: 7,
            type: "football",
          },
        ];
        const CategoryItem = (props) => {
          const { id, icon, name, onCount, offCount, type } = props;
          const isActive = activeCategoryId === id;
          const Icon = icon;
          return (
            <CategoryItemContainer
              className={`${isActive ? "active" : ""}`}
              onClick={() => handleCategoryClick(id, type)}
            >
              <div className="name">
                <Icon
                  width="36"
                  height="36"
                  color={`${isActive ? "#1D9A6C" : "#6C737F"}`}
                />
                <span className="text-name">{name}</span>
              </div>
              <div className="status">
                <div className="on">
                  {onCount}{" "}
                  <OpenDoor color={`${isActive ? "#1D9A6C" : "#6C737F"}`} />
                </div>
                <div className="off">
                  {offCount}
                  <ClosedDoor color={`${isActive ? "#F04438" : "#6C737F"}`} />
                </div>
              </div>
            </CategoryItemContainer>
          );
        };
        return (
          <CategoryListContainer>
            {category &&
              category.length > 0 &&
              category.map((item) => (
                <CategoryItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  name={item.name}
                  onCount={item.onCount}
                  offCount={item.offCount}
                  type={item.type}
                />
              ))}
          </CategoryListContainer>
        );
      };
      return (
        <LeftBarContainer>
          <LeftBarTitle>Tất cả sân</LeftBarTitle>
          <ListCategory />
        </LeftBarContainer>
      );
    };
    const RightBar = () => {
      const [selectedStadium, setSelectedStadium] = useState(null);
      const [showPopup, setShowPopup] = useState(false);
      const dummyStadium = [
        {
          name: "Sân bóng Bình Dương",
          image: "/images/std-1.png",
          ratePoint: 4.5,
          rateCount: 150,
          address:
            "105/4 Khu Phố Đông A, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
          tel: "0345111222",
          type: "football", // Loại sân
        },
        {
          name: "Sân Tân Quý",
          image: "/images/std-2.png",
          ratePoint: 4.0,
          rateCount: 120,
          address: "Số 10 Đường Tân Quý, Tân Quý, Tân Phú, TP. HCM, Việt Nam",
          tel: "0377223344",
          type: "badminton",
        },
        {
          name: "Sân Trần Hưng Đạo",
          image: "/images/std-3.png",
          ratePoint: 4.7,
          rateCount: 200,
          address:
            "1/25A Trần Hưng Đạo, P. Cầu Ông Lãnh, Quận 1, TP. HCM, Việt Nam",
          tel: "0388334455",
          type: "tennis",
        },
        {
          name: "Sân Nha Trang",
          image: "/images/std-4.png",
          ratePoint: 4.8,
          rateCount: 300,
          address: "24 Phạm Văn Đồng, Vĩnh Hải, Nha Trang, Khánh Hòa, Việt Nam",
          tel: "0399445566",
          type: "volleyball",
        },
        {
          name: "Sân Nguyễn Thị Minh Khai",
          image: "/images/std-5.png",
          ratePoint: 4.2,
          rateCount: 90,
          address: "56 Nguyễn Thị Minh Khai, Quận 3, TP. HCM, Việt Nam",
          tel: "0311223344",
          type: "basketball",
        },
        {
          name: "Sân Lê Văn Sỹ",
          image: "/images/std-6.png",
          ratePoint: 3.9,
          rateCount: 75,
          address: "12 Lê Văn Sỹ, Quận Tân Bình, TP. HCM, Việt Nam",
          tel: "0344556677",
          type: "football",
        },
        {
          name: "Sân Đinh Tiên Hoàng",
          image: "/images/std-7.png",
          ratePoint: 4.6,
          rateCount: 180,
          address: "17A Đinh Tiên Hoàng, Quận Bình Thạnh, TP. HCM, Việt Nam",
          tel: "0322334455",
          type: "badminton",
        },
        {
          name: "Sân Nguyễn Huệ",
          image: "/images/std-8.png",
          ratePoint: 4.3,
          rateCount: 140,
          address: "24 Nguyễn Huệ, Quận 1, TP. HCM, Việt Nam",
          tel: "0366223344",
          type: "volleyball",
        },
        {
          name: "Sân Nguyễn Văn Trỗi",
          image: "/images/std-9.png",
          ratePoint: 4.1,
          rateCount: 110,
          address:
            "12 Nguyễn Văn Trỗi, P.10, Quận Phú Nhuận, TP. HCM, Việt Nam",
          tel: "0333445566",
          type: "tennis",
        },
        {
          name: "Sân Võ Văn Tần",
          image: "/images/std-1.png",
          ratePoint: 4.4,
          rateCount: 190,
          address: "18 Võ Văn Tần, Quận 3, TP. HCM, Việt Nam",
          tel: "0355667788",
          type: "football",
        },
        {
          name: "Sân Lê Quang Định",
          image: "/images/std-2.png",
          ratePoint: 3.8,
          rateCount: 85,
          address: "Số 4, Lê Quang Định, Bình Thạnh, TP. HCM, Việt Nam",
          tel: "0377889900",
          type: "basketball",
        },
        {
          name: "Sân Lý Tự Trọng",
          image: "/images/std-3.png",
          ratePoint: 4.9,
          rateCount: 320,
          address: "45 Lý Tự Trọng, Quận 1, TP. HCM, Việt Nam",
          tel: "0344556677",
          type: "tennis",
        },
        {
          name: "Sân Lê Văn Sỹ",
          image: "/images/std-4.png",
          ratePoint: 4.2,
          rateCount: 100,
          address: "76 Lê Văn Sỹ, Quận Tân Bình, TP. HCM, Việt Nam",
          tel: "0333445566",
          type: "football",
        },
        {
          name: "Sân Hoàng Văn Thụ",
          image: "/images/std-5.png",
          ratePoint: 4.6,
          rateCount: 230,
          address: "62 Hoàng Văn Thụ, Phú Nhuận, TP. HCM, Việt Nam",
          tel: "0355778899",
          type: "football",
        },
        {
          name: "Sân Nguyễn Thị Minh Khai",
          image: "/images/std-6.png",
          ratePoint: 4.5,
          rateCount: 210,
          address: "82 Nguyễn Thị Minh Khai, Quận 3, TP. HCM, Việt Nam",
          tel: "0322334455",
          type: "volleyball",
        },
        {
          name: "Sân Lê Lợi",
          image: "/images/std-7.png",
          ratePoint: 4.0,
          rateCount: 140,
          address: "15 Lê Lợi, Huế, Thừa Thiên Huế, Việt Nam",
          tel: "0366557788",
          type: "basketball",
        },
        {
          name: "Sân Hải Thượng Lãn Ông",
          image: "/images/std-8.png",
          ratePoint: 4.3,
          rateCount: 170,
          address: "12 Hải Thượng Lãn Ông, Hà Nội, Việt Nam",
          tel: "0388990011",
          type: "football",
        },
        {
          name: "Sân Nguyễn Văn Cừ",
          image: "/images/std-9.png",
          ratePoint: 4.7,
          rateCount: 280,
          address: "45B Nguyễn Văn Cừ, Long Biên, Hà Nội, Việt Nam",
          tel: "0399112233",
          type: "badminton",
        },
        {
          name: "Sân Trần Phú",
          image: "/images/std-1.png",
          ratePoint: 3.9,
          rateCount: 95,
          address: "25 Trần Phú, Đà Nẵng, Việt Nam",
          tel: "0333445566",
          type: "volleyball",
        },
        {
          name: "Sân Lê Duẩn",
          image: "/images/std-2.png",
          ratePoint: 4.8,
          rateCount: 300,
          address: "14 Lê Duẩn, Đà Nẵng, Việt Nam",
          tel: "0377991122",
          type: "tennis",
        },
      ];

      const handleDetailClick = (stadium) => {
        setSelectedStadium(stadium);
        setShowPopup(true);
      };

      const closePopup = () => {
        setShowPopup(false);
      };

      const StadiumItem = ({ item }) => {
        const RateDisplay = ({ score, count }) => {
          const renderStars = (score) => {
            const fullStars = Math.floor(score);
            const hasHalfStar = score % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

            const stars = [];

            for (let i = 0; i < fullStars; i++) {
              stars.push(<FaStar key={`full-${i}`} color="#ffa500" />);
            }

            if (hasHalfStar) {
              stars.push(<FaStarHalfAlt key="half" color="#ffa500" />);
            }

            for (let i = 0; i < emptyStars; i++) {
              stars.push(<FaRegStar key={`empty-${i}`} color="#ccc" />);
            }
            return stars;
          };

          return (
            <RateDisplayContainer>
              <StarsContainer>{renderStars(score)}</StarsContainer>
              <RatingCount>
                {score?.toFixed(1)}
                {` `}({count} ratings)
              </RatingCount>
            </RateDisplayContainer>
          );
        };
        return (
          <StadiumItemContainer>
            <img src={item?.images[0]} alt="" className="stadium-image" />
            <div className=" stadium-info stadium-info-header">
              <span className="stadium-name">{item.name}</span>
              <RateDisplay score={item.ratePoint} count={item.rateCount} />
            </div>
            <div className="stadium-info stadium-info-bottom">
              <div className="stadium-address">
                <AddressIcon />
                <span className="text-address">{item.address}</span>
              </div>
              <div className="stadium-tel">
                <TelIcon />
                <span className="text-tel">{item.tel}</span>
              </div>
            </div>
            <div className="action">
              <button
                className="detail"
                onClick={() => handleDetailClick(item)}
              >
                Chi tiết
              </button>
              <a href={`/booking/${item.id}`} className="booking">
                <BookIcon />
                <span>Đặt lịch</span>
              </a>
            </div>
          </StadiumItemContainer>
        );
      };
      const PopupBar = () => {
        const [activeTab, setActiveTab] = useState("info");
        const pricingData = {
          "Sân thường": {
            "KHÁCH HÀNG": [
              { day: "T2-CN", time: "5h-16h", fixed: "80.000 đ", casual: "--" },
              { day: "T2-CN", time: "16h-0h", fixed: "90.000 đ", casual: "--" },
            ],
            "HỌC SINH - SINH VIÊN": [
              { day: "T2-T6", time: "5h-16h", fixed: "55.000 đ", casual: "--" },
              { day: "T2-T6", time: "16h-0h", fixed: "70.000 đ", casual: "--" },
              { day: "T7-CN", time: "5h-16h", fixed: "80.000 đ", casual: "--" },
              { day: "T7-CN", time: "16h-0h", fixed: "90.000 đ", casual: "--" },
            ],
          },
        };
        const PricingTable = () => {
          return (
            <div>
              {Object.entries(pricingData).map(([category, categoryData]) => (
                <div key={category}>
                  <h3>{category}:</h3>
                  {Object.entries(categoryData).map(([group, groupData]) => (
                    <div key={group}>
                      <h4>{group}</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Thứ</th>
                            <th>Khung giờ</th>
                            <th>Cố định</th>
                            <th>Vãng lai</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.day}</td>
                              <td>{item.time}</td>
                              <td>{item.fixed}</td>
                              <td>{item.casual}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        };
        const hoursData = {
          "Sân thường": [
            { day: "T2-CN", time: "5h-16h" },
            { day: "T2-CN", time: "16h-0h" },
            { day: "T2-T6", time: "5h-16h" },
            { day: "T2-T6", time: "16h-0h" },
            { day: "T7-CN", time: "5h-16h" },
            { day: "T7-CN", time: "16h-0h" },
          ],
        };
        const HoursTable = () => {
          return (
            <div>
              {Object.entries(hoursData).map(([category, hours]) => (
                <div key={category}>
                  <h3>{category}:</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Thứ</th>
                        <th>Khung giờ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hours.map((item, index) => (
                        <tr key={index}>
                          <td>{item.day}</td>
                          <td>{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          );
        };

        const renderTabContent = () => {
          switch (activeTab) {
            case "info":
              return (
                <div className="tab-content">
                  <div className="overview">
                    <p className="title">Tổng quan</p>
                    <p className="address">
                      <AddressIcon /> {selectedStadium.address}
                    </p>
                    <p className="tel">
                      <TelIcon /> {selectedStadium.tel}
                    </p>
                    <p className="time">
                      <TimeIcon />
                    </p>
                  </div>
                  <div className="media">
                    <p className="title">Ảnh và video</p>
                    <div className="list-images">
                      <div className="image-item">
                        <img
                          src="/images/sub-image-1.png"
                          alt=""
                          className="image"
                        />
                      </div>
                      <div className="image-item">
                        <img
                          src="/images/sub-image-2.png"
                          alt=""
                          className="image"
                        />
                      </div>
                      <div className="image-item">
                        <img
                          src="/images/sub-image-3.png"
                          alt=""
                          className="image"
                        />
                      </div>
                      <div className="image-item">
                        <img
                          src="/images/sub-image-4.png"
                          alt=""
                          className="image"
                        />
                      </div>
                      <div className="image-item">
                        <img
                          src="/images/sub-image-1.png"
                          alt=""
                          className="image"
                        />
                      </div>
                      <div className="image-item">
                        <img
                          src="/images/sub-image-2.png"
                          alt=""
                          className="image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rate">
                    <p className="title">Đánh giá</p>
                  </div>
                </div>
              );
            case "services":
              return (
                <div className="tab-content price">
                  <PricingTable />
                </div>
              );
            case "hours":
              return (
                <div className="tab-content open-time">
                  <HoursTable />
                </div>
              );
            default:
              return null;
          }
        };

        return (
          <PopupBarContainer>
            <div className="popup-header">
              <div className="header">
                <div className="title">
                  <button className="close-btn" onClick={closePopup}>
                    <ArrowLeftIcon />
                    Quay lại
                  </button>
                  <h3 className="name">{selectedStadium.name}</h3>
                  <h3 className="type">{selectedStadium?.type}</h3>
                </div>
                <div className="booking">
                  <a href={`/booking/${selectedStadium.id}`}>Đặt sân</a>
                </div>
              </div>
              <img src={selectedStadium.image} alt="" className="popup-image" />
            </div>
            <div className="popup-content">
              <div className="tabs">
                <button
                  className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
                  onClick={() => setActiveTab("info")}
                >
                  Thông tin
                </button>
                <button
                  className={`tab-btn ${activeTab === "services" ? "active" : ""}`}
                  onClick={() => setActiveTab("services")}
                >
                  Dịch vụ
                </button>
                <button
                  className={`tab-btn ${activeTab === "hours" ? "active" : ""}`}
                  onClick={() => setActiveTab("hours")}
                >
                  Giờ mở cửa
                </button>
              </div>
              {renderTabContent()}
            </div>
          </PopupBarContainer>
        );
      };

      return (
        <RightBarContainer>
          {fields &&
            fields.length > 0 &&
            fields.map((item, index) => (
              <StadiumItem key={index} item={item} />
            ))}
          {showPopup && selectedStadium && <PopupBar />}
        </RightBarContainer>
      );
    };
    return (
      <ListContentContainer>
        <LeftBar />
        <RightBar />
      </ListContentContainer>
    );
  };
  return (
    <ListContainer>
      <ListHeader value={name} onSearch={setName} />
      <ListContent />
    </ListContainer>
  );
};
export default ListContent;
