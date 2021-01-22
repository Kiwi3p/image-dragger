import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import JSONDATA from "./data.json";
import { useState } from "react";
import "./DragReact.css";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const DragReact = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });

  return (
    <div className="all-canvas">
      <div className="canvas"
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage className="canvas-shrink"
          width={(window.innerWidth)}
          height={(window.innerHeight)}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
      <div className="auto-complete">
        <input
          type="text"
          placeholder="search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div className="results">
          {JSONDATA.filter((val) => {
            if (searchTerm == "") {
              return null;
            } else if (
              val.img.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          }).map((val, key) => {
            return (
              <div className="user" key={key}>
                <img
                  className="user lazy"
                  data-aos="fade-up"
                  src={require(`./images/${val.img}`).default}
                  alt={key}
                  draggable="true"
                  onDragStart={(e) => {
                    dragUrl.current = e.target.src;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DragReact;
