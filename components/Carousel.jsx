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

  useEffect(() => {
    const slider = containerRef.current;

    const startDragging = (e) => {
      setMouseDownState(true);
      setStartX(e.pageX);
      setScrollLeft(slider.scrollLeft);
    };

    const stopDragging = (e) => {
      setMouseDownState(false);
    };

    const move = (e) => {
      e.preventDefault();
      if (!mouseDownState) {
        return;
      }
      const x = e.pageX;
      const scroll = (x - startX) * 8;
      slider.scrollLeft = scrollLeft - scroll;
      // console.log("move", scroll);
    };

    // Add the event listeners
    slider.addEventListener("mousemove", move, false);
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);

    return () => {
      slider.removeEventListener("mousemove", move, false);
      slider.removeEventListener("mousedown", startDragging, false);
      slider.removeEventListener("mouseup", stopDragging, false);
      slider.removeEventListener("mouseleave", stopDragging, false);
    };
  }, [mouseDownState, startX, scrollLeft]);

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div
        className={`flex w-full p-5 gap-3.5 border-2 group overflow-x-auto transition-all duration-100 ease-linear scroll-smooth hideScrollBar ${
          mouseDownState ? "cursor-grabbing" : "cursor-pointer"
        }`}
        ref={containerRef}
      >
        <div
          className={`flex items-center gap-3.5 select-none group-hover:paused ${
            rtl ? "animate-rtl_carousel" : "animate-horizontal_carousel"
          }`}
          ref={childRef}
        >
          {duplicates.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
        <div
          className={`flex items-center gap-3.5 select-none group-hover:paused ${
            rtl ? "animate-rtl_carousel" : "animate-horizontal_carousel"
          }`}
          aria-hidden="true"
          ref={childRef}
        >
          {duplicates.map((list, idx) => (
            <Card key={`hidden-${idx}`} list={list} />
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
