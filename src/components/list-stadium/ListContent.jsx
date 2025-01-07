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
import {
  getSportsFields,
  getFieldDetails,
  getFieldComment,
  postReviewComment,
} from "@components/services/fieldsService";

import { useDebouncedCallback } from "use-debounce";
import Gallery from "./gallery/Gallery";
import ReviewForm from "./review/Review";

const ListContent = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState();
  const [fieldDetail, setFieldDetail] = useState();
  const [selectedField, setSelectedField] = useState();
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [commentField, setCommentField] = useState();
  console.log(fieldDetail);
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
  useEffect(() => {
    const fetchFieldsDetail = async () => {
      try {
        const data = await getFieldDetails(selectedField.id);
        setFieldDetail(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFieldsDetail();
  }, [selectedField]);
  useEffect(() => {
    const fetchFieldComment = async () => {
      try {
        const data = await getFieldComment(selectedField.id);
        setCommentField(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFieldComment();
  }, [selectedField]);
  const handleReviewSubmit = async (reviewData) => {
    const result = await postReviewComment(selectedField?.id, reviewData);
    if (result.data) {
      console.log(result);
    } else {
      setError(result.message);
      console.log(error);
    }
  };
  const calculateTimeSinceComment = (createAt) => {
    const createdTime = new Date(createAt).getTime();
    const now = Date.now();

    const diffInSeconds = Math.floor((now - createdTime) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    }
  };

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
  const handleDetailClick = (stadium) => {
    setSelectedStadium(stadium);
    setShowPopup(true);
    setSelectedField(stadium);
  };
  const closePopup = () => {
    setShowPopup(false);
    setSelectedStadium(null);
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
  console.log(commentField, 999);
  const ListMainContent = () => {
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
    const RightBar = ({ handleDetailClick, showPopup, selectedStadium }) => {
      const StadiumItem = ({ item }) => {
        const totalCount = item?.ratings?.reduce(
          (acc, item) => acc + item.count,
          0,
        );
        const totalRate = item?.ratings?.reduce(
          (acc, item) => acc + item.rate * item.count,
          0,
        );

        const averageRate = totalCount > 0 ? totalRate / totalCount : 0;
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
              <RateDisplay score={averageRate} count={totalCount} />
            </div>
            <div className="stadium-info stadium-info-bottom">
              <div className="stadium-address">
                <AddressIcon />
                <span className="text-address">{item.address}</span>
              </div>
              <div className="stadium-tel">
                <TelIcon />
                <span className="text-tel">{item?.owner?.phone_number}</span>
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
          const normalizeRatings = (ratingData) => {
            const fullRates = [1, 2, 3, 4, 5];

            const normalizedData = fullRates.map((rate) => {
              const existing = ratingData.find((item) => item.rate === rate);
              return existing ? existing : { rate, count: 0 };
            });

            return normalizedData.reverse();
          };
          const RatingProgress = ({ ratingData }) => {
            const normalizedData = normalizeRatings(ratingData);
            const totalCount = normalizedData.reduce(
              (acc, item) => acc + item.count,
              0,
            );
            const percentages = normalizedData.map((item) => ({
              rate: item.rate,
              percentage: totalCount > 0 ? (item.count / totalCount) * 100 : 0,
            }));
            const totalRate = normalizedData.reduce(
              (acc, item) => acc + item.rate * item.count,
              0,
            );
            const averageRate = totalCount > 0 ? totalRate / totalCount : 0;

            return (
              <div className="rating-container">
                <div className="rating-progress">
                  {percentages.map((item) => (
                    <div
                      className="rating-item"
                      key={item.rate}
                      style={{ marginBottom: "10px" }}
                    >
                      <p style={{ margin: 0 }}>{item.rate}</p>
                      <div
                        style={{
                          height: "10px",
                          width: "100%",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "5px",
                            width: `${item.percentage}%`,
                            backgroundColor: "#1D9A6C",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="averageRate">{averageRate.toFixed(1)}</div>
              </div>
            );
          };
          const RateDetail = ({ comments }) => {
            const [visibleCount, setVisibleCount] = useState(5);

            const handleShowMore = () => {
              setVisibleCount((prev) => prev + 5);
            };
            const RateDisplay = ({ score }) => {
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
                </RateDisplayContainer>
              );
            };
            const RateItem = ({ item }) => {
              return (
                <div className="rate-item">
                  <div className="user-info">
                    <img src={item.avatar_url || "/icons/Avatar.svg"} alt="" />
                    <p className="name">{item.full_name}</p>
                  </div>
                  <div className="score">
                    <RateDisplay score={item.rate} />
                    <span>{calculateTimeSinceComment(item.created_at)}</span>
                  </div>
                  <div className="comment">
                    <p className="text">{item.comment}</p>
                    <div className="images">
                      {item.images?.length > 0 && (
                        <Gallery photos={item.images} />
                      )}
                    </div>
                  </div>
                </div>
              );
            };
            return (
              <div className="rate-container">
                {comments?.slice(0, visibleCount).map((comment, index) => (
                  <RateItem key={index} item={comment} />
                ))}
                {visibleCount < comments?.length && (
                  <button onClick={handleShowMore}>Xem thêm</button>
                )}
              </div>
            );
          };
          switch (activeTab) {
            case "info":
              return (
                <div className="tab-content">
                  <div className="overview">
                    <p className="title">Tổng quan</p>
                    <p className="address">
                      <AddressIcon /> {fieldDetail.address}
                    </p>
                    <p className="tel">
                      <TelIcon /> {fieldDetail?.owner?.phone_number}
                    </p>
                    <p className="time">
                      <TimeIcon />{" "}
                      <span>
                        {fieldDetail.open_time} - {fieldDetail.close_time}
                      </span>
                    </p>
                  </div>
                  <div className="media">
                    <p className="title">Ảnh và video</p>
                    <div className="list-images">
                      {fieldDetail?.images?.length > 0 &&
                        fieldDetail.images.map((item, index) => (
                          <div className="image-item" key={index}>
                            <img src={item} alt="" className="image" />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="rate">
                    <p className="title">Đánh giá</p>
                    <RatingProgress ratingData={fieldDetail?.ratings} />
                    <div className="rate-detail">
                      <RateDetail comments={commentField} />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <ReviewForm onSubmit={handleReviewSubmit} />
                    </div>
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
        if (!fieldDetail) {
          return null;
        }
        return (
          <PopupBarContainer>
            <div className="popup-header">
              <div className="header">
                <div className="title">
                  <button className="close-btn" onClick={closePopup}>
                    <ArrowLeftIcon />
                    Quay lại
                  </button>
                  <h3 className="name">{fieldDetail.name}</h3>
                  <h3 className="type">{fieldDetail?.type}</h3>
                </div>
                <div className="booking">
                  <a href={`/booking/${fieldDetail.id}`}>Đặt sân</a>
                </div>
              </div>
              <img src={fieldDetail.image} alt="" className="popup-image" />
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
        <RightBar
          handleDetailClick={handleDetailClick}
          showPopup={showPopup}
          selectedStadium={selectedStadium}
        />
      </ListContentContainer>
    );
  };
  return (
    <ListContainer>
      <ListHeader value={name} onSearch={setName} />
      <ListMainContent />
    </ListContainer>
  );
};
export default ListContent;
