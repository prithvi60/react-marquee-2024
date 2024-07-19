"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import Card from "./Card";

const lists = [
  {
    title: "Hello WebWorld",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld2",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld3",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
];

// Elements prop: We take array of the elements from the user
const Carousel = ({ rtl = false, elements = lists, autofill = true }) => {
  const duplicates = useMemo(() => {
    return autofill && elements.length <= 8 ? CloneList(elements) : elements;
  }, [elements, autofill]);

  const [mouseDownState, setMouseDownState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef();
  const childRef = useRef();

  // console.log(duplicates[duplicates.length - 1]);

  useEffect(() => {
    const slider = containerRef.current;
    // console.log(slider.scrollX);
    // const child = childRef.current;
    const width = slider.scrollWidth;
    // const width2 = slider.clientWidth;
    // console.log(width2);
    // const scrollPos = slider.scrollLeft;
    console.log(width);
    const startDragging = (e) => {
      setMouseDownState(true);
      setStartX(e.pageX);
      setScrollLeft(slider.scrollLeft);
    };
    // console.log(startX);
    const stopDragging = (e) => {
      setMouseDownState(false);
    };

    const move = (e) => {
      e.preventDefault();

      if (!mouseDownState) {
        return;
      }
      const x = e.pageX; // container returns the X (horizontal) coordinate
      const scroll = (x - startX) * 8; // to scroll fast smooth effect will get, when we multiple the getting value
      slider.scrollLeft = scrollLeft - scroll;
      // if (scrollLeft >= width) {
      //   slider.scrollLeft = 0; // Reset scroll to the beginning
      // } else if (scrollLeft < 0) {
      //   slider.scrollLeft = width;  // Reset scroll to the end
      // }

      // console.log(scroll >= width2);
      if (scrollLeft - scroll >= width) {
        // console.log("logged");
        // slider.scrollTo(0, scrollLeft - scroll);
        slider.scrollLeft = 0;
      } else if (scrollLeft - scroll < 0) {
        // console.log("logged negative");
        // slider.scrollTo(0, width);
        slider.scrollLeft = width;
      }
    };

    // Add the event listeners
    slider.addEventListener("mousemove", move, false);
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    // slider.addEventListener("mouse", (e) => {
    //   console.log(e.offsetX);
    // });
    return () => {
      slider.removeEventListener("mousemove", move, false);
      slider.removeEventListener("mousedown", startDragging, false);
      slider.removeEventListener("mouseup", stopDragging, false);
      slider.removeEventListener("mouseleave", stopDragging, false);
      // slider.removeEventListener("mouse", (e) => {
      //   console.log(e.offsetX);
      // });
    };
  }, [mouseDownState, startX, scrollLeft]);

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div
        className={`flex w-full p-5 gap-3.5 border-2 group overflow-x-auto transition-all duration-100 ease-linear scroll-smooth ${
          mouseDownState ? "cursor-grabbing" : "cursor-pointer"
        }`}
        ref={containerRef}
      >
        <div
          className={`flex items-center gap-3.5 select-none group-hover:paused `}
          // ref={childRef}
        >
          {/* group-hover:paused ${
            rtl ? "animate-rtl_carousel" : "animate-horizontal_carousel"
          } */}
          {duplicates.map((list, idx) => (
            <Card key={idx} list={list} childRef={childRef} />
          ))}
        </div>
        <div
          className={`flex items-center gap-3.5 select-none group-hover:paused `}
          aria-hidden="true"
        >
          {duplicates.map((list, idx) => (
            <Card key={`hidden-${idx}`} list={list} childRef={childRef} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;

function CloneList(arr) {
  const n = arr.length;
  if (n === 0) return []; // If the array is empty, return an empty array

  const repeatCount = Math.floor(8 / n);
  const remainder = 8 % n;
  // we will always have 16 elements to scroll
  return Array.from({ length: repeatCount }, () => arr)
    .flat()
    .concat(arr.slice(0, remainder));
}
