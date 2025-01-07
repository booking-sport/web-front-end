import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 5px;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
  max-height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 18px;
    font-weight: bold;
    border-radius: 4px;
  }
`;

const FullGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 5px;
  margin-top: 5px;
  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PhotoGallery = ({ photos }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  if (!photos || photos.length === 0) {
    return <p>No photos available.</p>;
  }

  const previewPhotos = photos.slice(0, 4);
  const remainingCount = photos.length - 4;
  const placeholders = Array(4 - previewPhotos.length).fill(null);
  return (
    <div>
      <GalleryContainer>
        {previewPhotos.map((photo, index) => (
          <ImageWrapper
            key={index}
            onClick={index === 3 ? handleShowAll : null}
          >
            <img src={photo} alt={`Photo ${index + 1}`} />
            {index === 3 && remainingCount > 0 && !showAll && (
              <div className="overlay">+{remainingCount}</div>
            )}
          </ImageWrapper>
        ))}
        {placeholders.map((_, index) => (
          <ImageWrapper
            key={`placeholder-${index}`}
            style={{ visibility: "hidden" }}
          />
        ))}
      </GalleryContainer>

      {showAll && photos.length > 4 && (
        <FullGallery>
          {photos.slice(4).map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} />
          ))}
        </FullGallery>
      )}
    </div>
  );
};

export default PhotoGallery;
