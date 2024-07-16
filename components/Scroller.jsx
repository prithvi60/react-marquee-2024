"use client";
import React, { useEffect, useRef, useState } from "react";
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
  {
    title: "Hello WebWorld4",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld5",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld6",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
];

const Scroller = ({ rtl = false }) => {
  const [mouseDownState, setMouseDownState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    const slider = containerRef.current;
    // console.log(childRef.current);
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
      const scroll = (x - startX) ;
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
        className={`flex w-full p-5 gap-3.5  border-2 group overflow-x-auto transition-all duration-100 ease-linear scroll-smooth hideScrollBar ${
          mouseDownState ? "cursor-grabbing" : "cursor-pointer"
        }`}
        ref={containerRef}
      >
        <div
          className={`flex items-center gap-3.5 select-none group-hover:paused ${
            rtl === true
              ? "animate-rtl_carousel"
              : "animate-horizontal_carousel"
          }  `}
          ref={childRef}
        >
          {lists.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
        <div
          className={`flex items-center gap-3.5 select-none group-hover:paused ${
            rtl === true
              ? "animate-rtl_carousel"
              : "animate-horizontal_carousel"
          }  `}
          aria-hidden="true"
          ref={childRef}
        >
          {lists.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scroller;
