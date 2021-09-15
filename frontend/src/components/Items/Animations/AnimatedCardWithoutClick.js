import React from "react";
import "./AnimatedCardWithoutClick.css";

const AnimatedCard = ({ title, description }) => {
  return (
    <div className="card1">
      <h3>{title}</h3>
      <p className="small">{description}</p>
    </div>
  );
};

export default AnimatedCard;
