import React from "react";
import "./Coffee.css";

export default function Coffee() {
  return (
    <div className="container">
      <div className="steam" id="steam1"></div>
      <div className="steam" id="steam2"></div>
      <div className="steam" id="steam3"></div>
      <div className="steam" id="steam4"></div>
      <div id="cup">
        <div id="cup-body">
          <div id="cup-shade"></div>
        </div>
        <div id="cup-handle"></div>
      </div>
      <div id="saucer"></div>
      <div id="shadow"></div>
    </div>
  );
}
