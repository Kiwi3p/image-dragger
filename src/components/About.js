import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-all">
      <div className="about-me">
        <div className="text-content-about">
          <h1>About This Site</h1>
          <p className="description-about">
            This is a simple site for placing SVGs from a given library on a
            canvas. Simply use the search bar on the home page to scroll through
            your options and place them on the canvas!
          </p>
          <h4>
              Created with React, Kota canvas, and the rest is vanilla Javascript
          </h4>
        </div>
      </div>
    </div>
  );
}
