import React from "react";
import "./AnimatedCard.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const AnimatedCard = ({ isLocked, title, description, link }) => {
  return (
    <a
      className={`card1 ${isLocked ? "disabled" : ""}`}
      href={isLocked ? "javascript:;" : link}
    >
      {isLocked && <LockOutlinedIcon className={"icon"} color="secondary" />}
      <h3>{title}</h3>
      <p className="small">{description}</p>
      <div className="go-corner">
        <div className="go-arrow">→</div>
      </div>
    </a>
  );
};

export default AnimatedCard;
