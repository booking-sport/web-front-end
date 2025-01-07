import React, { useState } from "react";
import styled from "styled-components";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .star {
    font-size: 2rem;
    color: #ccc;
    cursor: pointer;
    transition: color 0.3s;
  }
  .star.selected {
    color: #f5a623;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #ddd;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const ReviewForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const handleSubmit = () => {
    if (!comment || rating === 0) {
      alert("Please provide a comment and rating!");
      return;
    }

    const reviewData = {
      comment: comment,
      rate: rating,
      images: images,
    };

    if (onSubmit) onSubmit(reviewData);
    setComment("");
    setRating(0);
    setImages([]);
  };

  return (
    <Container>
      <Title>Leave a Review</Title>
      <Textarea
        rows="5"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <StarRating>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "selected" : ""}`}
            onClick={() => setRating(star)}
          >
            <FaStar color={star <= rating ? "#ffa500" : "#ccc"} />
          </span>
        ))}
      </StarRating>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      <ImagePreview>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index + 1}`} />
        ))}
      </ImagePreview>
      <Button onClick={handleSubmit}>Submit Review</Button>
    </Container>
  );
};

export default ReviewForm;
