import React from "react";
import "./PlanetAnimation.css";

export default function PlanetAnimation() {
  return (
    <div className="system">
      <div className="system__orbit system__orbit--sun">
        <img
          src="/static/images/planete/sun.png"
          alt="Sun"
          className="system__icon system__icon--sun"
        />
      </div>
      <div className="system__orbit system__orbit--mercury">
        <div className="system__planet system__planet--mercury">
          <img src="/static/images/planete/mercury.png" alt="Mercury" />
        </div>
      </div>
      <div className="system__orbit system__orbit--venus">
        <div className="system__planet system__planet--venus">
          <img src="/static/images/planete/venus.png" alt="Venus" />
        </div>
      </div>
      <div className="system__orbit system__orbit--earth">
        <div className="system__planet system__planet--earth">
          <img src="/static/images/planete/earth.png" alt="Earth" />
        </div>
      </div>
      <div className="system__orbit system__orbit--mars">
        <div className="system__planet system__planet--mars">
          <img src="/static/images/planete/mars.png" alt="Mars" />
        </div>
      </div>
      <div className="system__orbit system__orbit--jupiter">
        <div className="system__planet system__planet--jupiter">
          <img src="/static/images/planete/jupiter.png" alt="Jupiter" />
        </div>
      </div>
      <div className="system__orbit system__orbit--saturn">
        <div className="system__planet system__planet--saturn">
          <img src="/static/images/planete/saturn.png" alt="Saturn" />
        </div>
      </div>
      <div className="system__orbit system__orbit--uranus">
        <div className="system__planet system__planet--uranus">
          <img src="/static/images/planete/uranus.png" alt="Uranus" />
        </div>
      </div>
      <div className="system__orbit system__orbit--neptune">
        <div className="system__planet system__planet--neptune">
          <img src="/static/images/planete/neptune.png" alt="Neptune" />
        </div>
      </div>
      <div className="system__orbit system__orbit--pluto">
        <div className="system__planet system__planet--pluto">
          <img src="/static/images/planete/pluto.png" alt="Pluto" />
        </div>
      </div>
    </div>
  );
}
