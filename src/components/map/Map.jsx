import {
  BadmintonIcon,
  BasketballIcon,
  FootballIcon,
  MultipleIcon,
  SearchIcon,
  TennisIcon,
  VolleyballIcon,
  AddressIcon,
  TelIcon,
  TimeIcon,
} from "@components/icons/svg";
import { debounce } from "lodash";
import maplibregl from "maplibre-gl";
import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import {
  FieldDetailContainer,
  FilterContainer,
  FilterSortContainer,
  MapContainer,
  RateDisplayContainer,
  RatingCount,
  SortContainer,
  StarsContainer,
} from "./StyledMap";

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const sportsFields = [
    // TP. HCM
    {
      id: 1,
      name: "Sân bóng đá Thống Nhất",
      position: [106.660172, 10.762622],
      type: "Bóng đá",
    },
    {
      id: 2,
      name: "Sân bóng chuyền Tao Đàn",
      position: [106.692482, 10.776945],
      type: "Bóng chuyền",
    },
    {
      id: 3,
      name: "Sân pickleball Lê Thị Riêng",
      position: [106.666687, 10.779784],
      type: "Pickleball",
    },
    {
      id: 4,
      name: "Sân phức hợp Phú Thọ",
      position: [106.670492, 10.762199],
      type: "Phức hợp",
    },
    {
      id: 5,
      name: "Sân tennis Lê Văn Tám",
      position: [106.688964, 10.788375],
      type: "Tennis",
    },
    {
      id: 6,
      name: "Sân bóng đá Kỳ Hòa",
      position: [106.684274, 10.772378],
      type: "Bóng đá",
    },
    {
      id: 7,
      name: "Sân cầu lông Bình Thạnh",
      position: [106.713375, 10.804152],
      type: "Cầu lông",
    },
    {
      id: 8,
      name: "Sân bóng chuyền Nhà Văn Hóa Lao Động",
      position: [106.683533, 10.77992],
      type: "Bóng chuyền",
    },
    {
      id: 9,
      name: "Sân tennis Tân Bình",
      position: [106.661741, 10.800159],
      type: "Tennis",
    },
    {
      id: 10,
      name: "Sân phức hợp Sala",
      position: [106.742939, 10.758282],
      type: "Phức hợp",
    },

    // Hà Nội
    {
      id: 11,
      name: "Sân bóng đá C500",
      position: [105.801944, 21.005273],
      type: "Bóng đá",
    },
    {
      id: 12,
      name: "Sân bóng chuyền ĐH Quốc Gia",
      position: [105.783191, 21.037814],
      type: "Bóng chuyền",
    },
    {
      id: 13,
      name: "Sân pickleball Cầu Giấy",
      position: [105.785723, 21.032472],
      type: "Pickleball",
    },
    {
      id: 14,
      name: "Sân tennis Mỹ Đình",
      position: [105.766543, 21.020107],
      type: "Tennis",
    },
    {
      id: 15,
      name: "Sân phức hợp Thanh Xuân",
      position: [105.795437, 20.999592],
      type: "Phức hợp",
    },
    {
      id: 16,
      name: "Sân cầu lông Hà Đông",
      position: [105.763382, 20.987562],
      type: "Cầu lông",
    },
    {
      id: 17,
      name: "Sân bóng đá Long Biên",
      position: [105.891947, 21.039024],
      type: "Bóng đá",
    },
    {
      id: 18,
      name: "Sân bóng chuyền Tây Hồ",
      position: [105.828252, 21.068554],
      type: "Bóng chuyền",
    },
    {
      id: 19,
      name: "Sân tennis Hoàng Mai",
      position: [105.847621, 20.977631],
      type: "Tennis",
    },
    {
      id: 20,
      name: "Sân phức hợp Đông Anh",
      position: [105.856938, 21.148682],
      type: "Phức hợp",
    },

    // Đà Nẵng
    {
      id: 21,
      name: "Sân bóng đá Hòa Xuân",
      position: [108.228057, 16.03052],
      type: "Bóng đá",
    },
    {
      id: 22,
      name: "Sân bóng chuyền Hải Châu",
      position: [108.208061, 16.055309],
      type: "Bóng chuyền",
    },
    {
      id: 23,
      name: "Sân pickleball Công viên 29/3",
      position: [108.207634, 16.061432],
      type: "Pickleball",
    },
    {
      id: 24,
      name: "Sân cầu lông Sơn Trà",
      position: [108.25, 16.089728],
      type: "Cầu lông",
    },
    {
      id: 25,
      name: "Sân tennis Thanh Khê",
      position: [108.190025, 16.059216],
      type: "Tennis",
    },
    {
      id: 26,
      name: "Sân bóng đá Mỹ Khê",
      position: [108.245321, 16.062739],
      type: "Bóng đá",
    },
    {
      id: 27,
      name: "Sân bóng chuyền Cẩm Lệ",
      position: [108.221562, 16.021973],
      type: "Bóng chuyền",
    },
    {
      id: 28,
      name: "Sân phức hợp Hòa Vang",
      position: [108.062457, 15.962395],
      type: "Phức hợp",
    },
    {
      id: 29,
      name: "Sân tennis Ngũ Hành Sơn",
      position: [108.249421, 16.036742],
      type: "Tennis",
    },
    {
      id: 30,
      name: "Sân cầu lông Liên Chiểu",
      position: [108.148721, 16.074395],
      type: "Cầu lông",
    },

    // Cần Thơ
    {
      id: 31,
      name: "Sân bóng đá Cần Thơ",
      position: [105.770219, 10.045162],
      type: "Bóng đá",
    },
    {
      id: 32,
      name: "Sân bóng chuyền Lê Lợi",
      position: [105.780284, 10.029975],
      type: "Bóng chuyền",
    },
    {
      id: 33,
      name: "Sân pickleball Ninh Kiều",
      position: [105.78797, 10.03592],
      type: "Pickleball",
    },
    {
      id: 34,
      name: "Sân tennis Trà Nóc",
      position: [105.755042, 10.01592],
      type: "Tennis",
    },
    {
      id: 35,
      name: "Sân cầu lông Hưng Phú",
      position: [105.766013, 10.020844],
      type: "Cầu lông",
    },
    {
      id: 36,
      name: "Sân bóng đá Bình Thủy",
      position: [105.741281, 10.086372],
      type: "Bóng đá",
    },
    {
      id: 37,
      name: "Sân phức hợp Đại Học Cần Thơ",
      position: [105.772621, 10.030511],
      type: "Phức hợp",
    },
    {
      id: 38,
      name: "Sân bóng chuyền Ô Môn",
      position: [105.688281, 10.094211],
      type: "Bóng chuyền",
    },
    {
      id: 39,
      name: "Sân pickleball Long Tuyền",
      position: [105.741932, 10.022881],
      type: "Pickleball",
    },
    {
      id: 40,
      name: "Sân tennis Bình Thủy",
      position: [105.738112, 10.028231],
      type: "Tennis",
    },

    // Nha Trang
    {
      id: 41,
      name: "Sân bóng đá 2/4",
      position: [109.200171, 12.24343],
      type: "Bóng đá",
    },
    {
      id: 42,
      name: "Sân bóng chuyền Phước Long",
      position: [109.207345, 12.228041],
      type: "Bóng chuyền",
    },
    {
      id: 43,
      name: "Sân pickleball Lộc Thọ",
      position: [109.203791, 12.245202],
      type: "Pickleball",
    },
    {
      id: 44,
      name: "Sân cầu lông Nha Trang",
      position: [109.210323, 12.243741],
      type: "Cầu lông",
    },
    {
      id: 45,
      name: "Sân tennis Diên Khánh",
      position: [109.176112, 12.247452],
      type: "Tennis",
    },
    {
      id: 46,
      name: "Sân bóng đá Vĩnh Phước",
      position: [109.186721, 12.252391],
      type: "Bóng đá",
    },
    {
      id: 47,
      name: "Sân bóng chuyền Vĩnh Thạnh",
      position: [109.209831, 12.232181],
      type: "Bóng chuyền",
    },
    {
      id: 48,
      name: "Sân pickleball Xóm Bóng",
      position: [109.211002, 12.257092],
      type: "Pickleball",
    },
    {
      id: 49,
      name: "Sân phức hợp Cam Ranh",
      position: [109.214512, 11.923982],
      type: "Phức hợp",
    },
    {
      id: 50,
      name: "Sân cầu lông Phước Đồng",
      position: [109.199721, 12.235622],
      type: "Cầu lông",
    },
  ];
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
          {score.toFixed(1)}
          {` `}({count} ratings)
        </RatingCount>
      </RateDisplayContainer>
    );
  };

  const FieldDetail = ({ field, onClose }) => {
    if (!field) return null;
    const ratingScore = 4.5;
    const ratingCount = 150;
    return (
      <FieldDetailContainer>
        <img
          className="main-image"
          src={field.image || "/images/image-default.png"}
          alt={field.name}
        />
        <div className="stadium-info">
          <div className="top">
            <div className="name-rate">
              <h3 className="name">{field.name}</h3>
              <div className="rate">
                <RateDisplay score={ratingScore} count={ratingCount} />
              </div>
            </div>
            <div className="direction"> </div>
          </div>
          <div className="mid">
            <div className="address">
              <AddressIcon />
            </div>
            <div className="tel">
              <TelIcon />
            </div>
            <div className="time">
              <TimeIcon />
            </div>
          </div>
          <div className="bottom">
            <p className="title">Ảnh và video</p>
            <div className="list-images">
              <div className="image-item">
                <img src="/images/sub-image-1.png" alt="" className="image" />
              </div>
              <div className="image-item">
                <img src="/images/sub-image-2.png" alt="" className="image" />
              </div>
              <div className="image-item">
                <img src="/images/sub-image-3.png" alt="" className="image" />
              </div>
              <div className="image-item">
                <img src="/images/sub-image-4.png" alt="" className="image" />
              </div>
              <div className="image-item">
                <img src="/images/sub-image-1.png" alt="" className="image" />
              </div>
              <div className="image-item">
                <img src="/images/sub-image-2.png" alt="" className="image" />
              </div>
            </div>
          </div>
        </div>
      </FieldDetailContainer>
    );
  };

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [105.801944, 21.005273],
      zoom: 10,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);
  useEffect(() => {
    if (map) {
      const bounds = new maplibregl.LngLatBounds();
      sportsFields.forEach((field) => {
        bounds.extend(field.position); // Mở rộng vùng bao quanh
        const marker = new maplibregl.Marker({
          element: createCustomMarker(field.type),
        })
          .setLngLat(field.position)
          .addTo(map);

        function createCustomMarker(type) {
          const div = document.createElement("div");
          div.className = "custom-marker";
          if (type === "Bóng đá") {
            div.style.backgroundImage = "url(/icons/SanBanh.svg)";
          } else if (type === "Bóng chuyền") {
            div.style.backgroundImage = "url(/icons/SanBongChuyen.svg)";
          } else if (type === "Cầu lông") {
            div.style.backgroundImage = "url(/icons/SanCauLong.svg)";
          } else if (type === "Tennis") {
            div.style.backgroundImage = "url(/icons/SanTennis.svg)";
          } else if (type === "Phức hợp") {
            div.style.backgroundImage = "url(/icons/SanPhucHop.svg)";
          } else if (type === "Bóng rổ") {
            div.style.backgroundImage = "url(/icons/SanBongRo.svg)";
          }
          div.style.width = "30px";
          div.style.height = "50px";
          div.style.backgroundSize = "cover";
          return div;
        }
        const popupContent = ReactDOMServer.renderToStaticMarkup(
          <FieldDetail field={field} />,
        );
        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
          popupContent,
        );

        marker.setPopup(popup);
      });
    }
  }, [map]);
  useEffect(() => {
    if (map) {
      console.log("Map is ready:", map);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const handleResize = debounce(() => map.resize(), 200);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [map]);
  const FilterSort = () => {
    const Filter = () => {
      return (
        <FilterContainer>
          <input type="text" placeholder="Tìm kiếm sân..." />
          <button>
            <SearchIcon />
          </button>
        </FilterContainer>
      );
    };
    const Sort = () => {
      const [activeButton, setActiveButton] = useState(null);

      const handleButtonClick = (id) => {
        setActiveButton(id); // Cập nhật nút được chọn
      };
      const sortList = [
        {
          id: "football",
          title: "Sân bóng đá",
          icon: FootballIcon,
        },
        {
          id: "badminton ",
          title: "Sân cầu lông",
          icon: BadmintonIcon,
        },
        {
          id: "tennis",
          title: "Sân tennis",
          icon: TennisIcon,
        },
        {
          id: "basketball",
          title: "Sân bóng rổ",
          icon: BasketballIcon,
        },
        {
          id: "volleyball",
          title: "Sân bóng chuyền",
          icon: VolleyballIcon,
        },
        {
          id: "multiple",
          title: "Sân phức hợp",
          icon: MultipleIcon,
        },
      ];
      const SortItem = (props) => {
        const { id, title, icon } = props;
        const Icon = icon;
        return (
          <button
            className={`sort-item ${activeButton === id ? "active" : ""}`}
            id={id}
            onClick={() => handleButtonClick(id)}
          >
            <Icon color={`${activeButton === id ? "#fff" : "#6C737F"}`} />
            <span>{title}</span>
          </button>
        );
      };
      return (
        <SortContainer>
          {sortList &&
            sortList.map((item) => {
              return (
                <SortItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  icon={item.icon}
                />
              );
            })}
        </SortContainer>
      );
    };
    return (
      <FilterSortContainer>
        <Filter />
        <Sort />
      </FilterSortContainer>
    );
  };
  return (
    <MapContainer className="map-container" ref={mapContainer}>
      <FilterSort />
    </MapContainer>
  );
};

export default Map;
