import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
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
  CloseIcon,
} from "@components/icons/svg";
import maplibregl from "maplibre-gl";
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
  const [filterResults, setFilterResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [showFieldDetail, setShowFieldDetail] = useState(false);

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
    console.log(field, 999);
    return (
      <FieldDetailContainer>
        {onClose && (
          <button className="btn-close" onClick={onClose}>
            <CloseIcon />
          </button>
        )}
        <img
          className="main-image"
          src={field.images[0] || "/images/image-default.png"}
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
              {field.images &&
                field.images.length > 0 &&
                field.images.map((image, index) => (
                  <div className="image-item" key={index}>
                    <img src={image} alt="" className="image" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </FieldDetailContainer>
    );
  };
  const onShowFieldDetail = () => {
    setShowFieldDetail(true);
  };

  const onCloseFieldDetail = () => {
    setShowFieldDetail(false);
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
  }, [fields]);
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
    const Filter = ({ value, onSearch }) => {
      const [localName, setLocalName] = useState(value);
      useEffect(() => {
        const debouncedSearch = debounce(() => {
          onSearch(localName);
        }, 300);

        debouncedSearch();
        return () => debouncedSearch.cancel();
      }, [localName, onSearch]);

      const handleInputChange = (e) => {
        setLocalName(e.target.value);
      };
      const handleInputFocus = () => {
        setShowPopup(true);
      };

      return (
        <FilterContainer>
          <input
            type="text"
            placeholder="Tìm kiếm sân..."
            value={localName}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <button>
            <SearchIcon />
          </button>
          {showPopup && (
            <div className="popup-bar">
              {filterResults.length > 0 ? (
                filterResults.map((field) => (
                  <div
                    key={field.id}
                    className="popup-item"
                    onClick={() => {
                      setShowPopup(false);
                      setSelectedField(field);
                      onShowFieldDetail();
                    }}
                  >
                    {field.name}
                  </div>
                ))
              ) : (
                <div className="popup-item">Không tìm thấy sân</div>
              )}
            </div>
          )}
          {showFieldDetail && selectedField && (
            <div className="field-detail">
              <FieldDetail onClose={onCloseFieldDetail} field={selectedField} />
            </div>
          )}
        </FilterContainer>
      );
    };
    const Sort = () => {
      const handleButtonClick = (id, type) => {
        setActiveButton(id);
        setType(type);
      };
      const sortList = [
        {
          id: "football",
          type: "football",
          title: "Sân bóng đá",
          icon: FootballIcon,
        },
        {
          id: "badminton",
          type: "badminton",
          title: "Sân cầu lông",
          icon: BadmintonIcon,
        },
        {
          id: "tennis",
          type: "tennis",
          title: "Sân tennis",
          icon: TennisIcon,
        },
        {
          id: "basketball",
          type: "basketball",
          title: "Sân bóng rổ",
          icon: BasketballIcon,
        },
        {
          id: "volleyball",
          type: "volleyball",
          title: "Sân bóng chuyền",
          icon: VolleyballIcon,
        },
        {
          id: "multiple",
          type: "multiple",
          title: "Sân phức hợp",
          icon: MultipleIcon,
        },
      ];
      const SortItem = (props) => {
        const { id, title, icon, type } = props;
        const Icon = icon;
        return (
          <button
            className={`sort-item ${activeButton === id ? "active" : ""}`}
            id={id}
            onClick={() => handleButtonClick(id, type)}
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
                  type={item.type}
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
        <Filter value={nameSearch} onSearch={setNameSearch} />
        <Sort />
      </FilterSortContainer>
    );
  };
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getSportsFields(type, "");
        setFields(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [type]);

  const fetchFieldsFilter = debounce(
    async (type, nameSearch, setFilterResults, setError, setLoading) => {
      try {
        setLoading(true);
        const data = await getSportsFields(type, nameSearch);
        setFilterResults(data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    300,
  );

  useEffect(() => {
    if (nameSearch.trim() === "") {
      setFilterResults([]);
      return;
    }
    fetchFieldsFilter(type, nameSearch, setFilterResults, setError, setLoading);
  }, [type, nameSearch]);
  return (
    <MapContainer className="map-container" ref={mapContainer}>
      <FilterSort />
    </MapContainer>
  );
};

export default Map;
