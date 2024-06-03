import React, { useEffect, useState, useRef } from "react";
import "./Carosuel.css";

const Carosuel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState("");
  const slideInterval = useRef(null);

  useEffect(() => {
    startAutoSlide();

    const resetAnimation = () => setDirection("");
    const slideElement = document.querySelector(".slide");
    if (slideElement) {
      slideElement.addEventListener("animationend", resetAnimation);
    }

    return () => {
      if (slideElement) {
        slideElement.removeEventListener("animationend", resetAnimation);
      }
    };
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval
    slideInterval.current = setInterval(() => {
      setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setDirection("right");
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
    setDirection("right");
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
    setDirection("left");
  };

  return (
    <div
      className="carousel"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {data.map((item, idx) => (
        <div
          className={`slide ${
            slide === idx ? `slide-active ${direction}` : "slide-hidden"
          }`}
          key={idx}
        >
          <img className="slide-img" src={item.src} alt={item.alt} />
          <div className="overlay">
            <div className="text-container">
              <span className="tag">{item.tag}</span>
              <h2 className="title">{item.title}</h2>
              <div className="author-info">
                {/* <span className="author">{item.author}</span> */}
                <span className="date">{item.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="indicators">
        {data.map((_, idx) => (
          <button
            className={`indicator ${slide === idx ? "" : "indicator-inactive"}`}
            key={idx}
            onClick={() => {
              setSlide(idx);
              setDirection("right");
            }}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default Carosuel;
