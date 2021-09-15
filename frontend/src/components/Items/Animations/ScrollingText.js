import React from "react";
import "./ScrollingText.css";

export default function ScrollingText(props) {
  return (
    <div className="root">
      <div className="content">
        <div className="content__container">
          <p className="content__container__text">{props.titleBefore}</p>
          <ul className="content__container__list">
            {props.items.map((item) => {
              return <li className="content__container__list__item">{item}</li>;
            })}
          </ul>
          <p className="content__container__text__after">{props.titleAfter}</p>
        </div>
      </div>
    </div>
  );
}
