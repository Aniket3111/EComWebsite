import React from "react";
import { Rating } from "@mui/material";
import profilepng from "../../images/profilepng.png";
const ReviewCard = ({ review }) => {
  const options = {
    readOnly: true,
    precision: 0.5,
    value: review.rating,
  };
  return (
    <div className="reviewCard">
      <img src={profilepng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
