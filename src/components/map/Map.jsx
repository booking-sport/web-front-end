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
import { getSportsFields } from "@components/services/fieldsService";

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sportsFields = [
    {
      id: 1,
      stadium_type: "football",
      name: "Thanh Dung",
      address: "Nguyen Xien",
      longitude: null,
      latitude: null,
      award: null,
      strict: null,
      province: null,
      open_time: null,
      close_time: null,
      number_field: null,
      bank_account: "",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 2,
      stadium_type: "football",
      name: "Thanh Dung",
      address: "123 Pham Tu, Nguyen Xien",
      longitude: 105.80360625217236,
      latitude: 20.96654007505038,
      award: null,
      strict: "Thanh Xuan",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 3,
      stadium_type: "football",
      name: "Minh Duc",
      address: "122 Pham Tu, Nguyen Xien",
      longitude: 105.80579948069008,
      latitude: 20.96773795845125,
      award: null,
      strict: "Thanh Xuan",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 4,
      stadium_type: "football",
      name: "Tuan Phong",
      address: "10 Pham Tu, Nguyen Xien",
      longitude: 105.80582093836138,
      latitude: 20.966766171024,
      award: null,
      strict: "Thanh Xuan",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 5,
      stadium_type: "football",
      name: "Dai Nam",
      address: "XR93+Q7, Thanh Liệt, Thanh Trì, Hà Nội, Việt Nam",
      longitude: 105.8029986130861,
      latitude: 20.968809799011964,
      award: null,
      strict: "Thanh Xuan",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 6,
      stadium_type: "football",
      name: "Yên Xá",
      address:
        "Sân bóng Yên Xá, no name/67 Đ. Yên Xá, Tân Triều, Thanh Trì, Hà Nội, Việt Nam",
      longitude: 105.79835302724972,
      latitude: 20.967918165632504,
      award: null,
      strict: "Thanh Xuan",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 7,
      stadium_type: "football",
      name: "Hà Trì",
      address: "XQ7J+PV Hà Đông, Hà Nội, Việt Nam",
      longitude: 105.78220494510668,
      latitude: 20.964465837886944,
      award: null,
      strict: "Thanh Xuan",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 8,
      stadium_type: "football",
      name: "Nhạc Họa",
      address: "XQMV+8M3, ",
      longitude: 105.7952968239048,
      latitude: 20.983506694095556,
      award: null,
      strict: "Hà Đông",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 2,
      bank_account: "1016924279",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 9,
      stadium_type: "football",
      name: "Bắc Việt",
      address:
        "XQFW+846, khu phát tín cuối đường chiến thắng hà đông, Ngõ 1, Tân Triều, Thanh Xuân, Hà Nội, Việt Nam",
      longitude: 105.7961122154134,
      latitude: 20.9735491286702,
      award: null,
      strict: "Thanh Triểu",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "189786778",
      bank: "techcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 10,
      stadium_type: "football",
      name: "Zone9 Van Quan",
      address: "Khu đô thị Văn Quán, Hà Đông, Hà Nội, Việt Nam",
      longitude: 105.79366604088524,
      latitude: 20.972006347925102,
      award: null,
      strict: "Ha Dong",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "189786778",
      bank: "techcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 11,
      stadium_type: "badminton",
      name: "CẦU LÔNG TRIỀU KHÚC",
      address:
        "Đ. Tân Triều Mới, Triều Khúc, Thanh Trì, Hà Nội 000084, Việt Nam",
      longitude: 105.80179849776223,
      latitude: 20.977756476930345,
      award: null,
      strict: "Ha Dong",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "189786778",
      bank: "techcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 12,
      stadium_type: "badminton",
      name: "Cầu Lông LC300",
      address: "Đ. Tân Triều Mới, Tân Triều, Thanh Trì, Hà Nội, Việt Nam",
      longitude: 105.80010334172958,
      latitude: 20.97659441653703,
      award: null,
      strict: "Ha Dong",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "189786778",
      bank: "techcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 13,
      stadium_type: "badminton",
      name: " Minh Toàn CS2",
      address:
        "XRP2+7JG, Ngõ 214 Đường Nguyễn Xiển, Hạ Đình, Thanh Xuân, Hà Nội, Việt Nam",
      longitude: 105.80156368715038,
      latitude: 20.98636287978606,
      award: null,
      strict: "Ha Dong",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "109888776",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [],
    },
    {
      id: 14,
      stadium_type: "badminton",
      name: " cầu lông BMC CLUB",
      address:
        "Ngách 86 Ngõ 286 Đ. Nguyễn Xiển, Tân Triều, Thanh Trì, Hà Nội, Việt Nam",
      longitude: 105.80627310822722,
      latitude: 20.985527688346743,
      award: null,
      strict: "Thanh Tri",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "109888776",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [
        "https://lh5.googleusercontent.com/p/AF1QipMvuKC9gk52f1liE7DUocZ0Gz8sYJslSbRONSs=w408-h306-k-no",
      ],
    },
    {
      id: 15,
      stadium_type: "badminton",
      name: "  cầu lông 4T BADMINTON Triều Khúc",
      address: "Triều Khúc, Thanh Trì, Hà Nội, Việt Nam",
      longitude: 105.8076148986632,
      latitude: 20.984004680181823,
      award: null,
      strict: "Thanh Tri",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "109888776",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [
        "https://lh5.googleusercontent.com/p/AF1QipMvuKC9gk52f1liE7DUocZ0Gz8sYJslSbRONSs=w408-h306-k-no",
      ],
    },
    {
      id: 16,
      stadium_type: "badminton",
      name: "Sân cầu lông VB",
      address: "XQH9+6V Hà Đông, Hà Nội, Việt Nam",
      longitude: 105.77285160936866,
      latitude: 20.978839476736542,
      award: "Tan Tri",
      strict: "Thanh Tri",
      province: "HaNoi",
      open_time: "08:00:00",
      close_time: "22:00:00",
      number_field: 4,
      bank_account: "109888776",
      bank: "vietcombank",
      field_map_image_path: null,
      images: [
        "https://lh5.googleusercontent.com/p/AF1QipMvuKC9gk52f1liE7DUocZ0Gz8sYJslSbRONSs=w408-h306-k-no",
      ],
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
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [105.801944, 21.005273],
      zoom: 10,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);
  useEffect(() => {
    if (map && fields.length > 0) {
      // const bounds = new maplibregl.LngLatBounds();
      fields.forEach((field) => {
        if (!field.longitude || !field.latitude) return;
        // bounds.extend([field.longitude, field.latitude]);
        const marker = new maplibregl.Marker({
          element: createCustomMarker(field.stadium_type),
        })
          .setLngLat([field.longitude, field.latitude])
          .addTo(map);

        function createCustomMarker(type) {
          const div = document.createElement("div");
          div.className = "custom-marker";
          if (type === "football") {
            div.style.backgroundImage = "url(/icons/SanBanh.svg)";
          } else if (type === "volleyball") {
            div.style.backgroundImage = "url(/icons/SanBongChuyen.svg)";
          } else if (type === "badminton") {
            div.style.backgroundImage = "url(/icons/SanCauLong.svg)";
          } else if (type === "tennis") {
            div.style.backgroundImage = "url(/icons/SanTennis.svg)";
          } else if (type === "complex") {
            div.style.backgroundImage = "url(/icons/SanPhucHop.svg)";
          } else if (type === "basketball") {
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
  }, [map, fields]);
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
        setActiveButton(id);
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
            <Icon
              width="24"
              height="24"
              color={`${activeButton === id ? "#fff" : "#6C737F"}`}
            />
            <span>{title}</span>
          </button>
        );
      };
      return (
        <SortContainer>
          {sortList &&
            sortList.length > 0 &&
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
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getSportsFields();
        setFields(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);
  return (
    <MapContainer className="map-container" ref={mapContainer}>
      <FilterSort />
    </MapContainer>
  );
};

export default Map;
