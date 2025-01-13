import React, { useEffect, useState } from "react";

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import "./CustomCarousel.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";

const CustomCarousel = ({ images }) => {
  let slideIndex = 0;
  function showSlide() {
    if (slideIndex >= slides?.length) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = slides?.length - 1;
    }

    slides.forEach((slide) => {
      slide.classList.remove("displaying");
    });
    slides[slideIndex].classList.add("displaying");
  }

  function nextSlide(nextSlideCallFromInterval) {
    if (!nextSlideCallFromInterval) {
      clearInterval(intervalId);
    }
    slideIndex++;
    showSlide();
  }
  function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide();
  }

  function initializeSlider() {
    slides[0].classList.add("displaying");
    if (slides.length > 1) {
      intervalId = setInterval(() => nextSlide(true), 2000);
    }
  }

  let slides = null;
  let intervalId = null;
  useEffect(() => {
    //set Images
    slides = document.querySelectorAll(".slides img");
    initializeSlider();
  }, [images]);

  useEffect(() => {
    //
    return () => {
      // console.log("returning");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="ProductDetails">
        {/* {product.length > 0 ? (
              <div className="indexShow">
                {slideIndex + 1} of {product.images.length}
              </div>
            ) : null} */}
        {images.length >= 2 && (
          <button className="prev" onClick={prevSlide}>
            <GrFormPrevious />
          </button>
        )}
        <div className="slides">
          {images.length != 0 &&
            images.map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </div>
        {images.length >= 2 && (
          <button className="next" onClick={() => nextSlide(false)}>
            <GrFormNext />
          </button>
        )}
      </div>
    </>
  );
};
export default CustomCarousel;
