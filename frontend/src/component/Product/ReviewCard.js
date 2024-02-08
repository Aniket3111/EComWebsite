import React from "react";
import ReactStars from "react-rating-stars-component";
import profilepng from "../../images/profilepng.png";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
  };
  return (
    <div className="reviewCard">
      <img src={profilepng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
