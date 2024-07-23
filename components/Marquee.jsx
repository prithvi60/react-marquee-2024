"use client";
import { CloneList } from "@/helper/CloneArray";
import React, { useRef, useState, useEffect } from "react";

// const duplicates = useMemo(() => {
//   return autofill && elements.length <= 8 ? CloneList(elements) : elements;
// }, [elements, autofill]);

// TODO: Autofill feature atleast 16 elements , Performance bugs , rtl, marquee animation end glitch

const Marquee = ({
  // rtl = false,
  // autofill = true,
  children,
}) => {
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const [mouseDown, setMouseDown] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const styles = ` flex w-full p-5 gap-3.5 border-2 group snap-x snap-mandatory overflow-x-auto custom  ${
    mouseDown
      ? "cursor-grabbing scroll-smooth transition-transform duration-500 ease-linear"
      : "cursor-pointer scroll-auto"
  }`;
  // MouseDown event was used to collect client X value and stored in the ClientX state
  const handleDrag = (e) => {
    setMouseDown(true);
    setClientX((prev) => e.pageX);
    setScrollLeft((prev) => containerRef.current.scrollLeft);
  };

  const handleMove = (e) => {
    e.preventDefault();
    //
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - containerRef.current.offsetLeft; // container returns the X (horizontal) coordinate
    const scroll = (x - clientX) * 1.25;
    containerRef.current.scrollLeft = scrollLeft - scroll; //  scrollLeft value directly applied while mouseMove events occur
  };

  const handleInfiniteScroll = (e) => {
    const containerWidth = containerRef.current.clientWidth;
    const scrollbarWidth = containerRef.current.scrollWidth;

    if (containerRef.current.scrollLeft === 0) {
      // if the scroll is at the beginning,scroll to the end
      containerRef.current.scrollLeft = scrollbarWidth - 2 * containerWidth;
      // console.log("left end");
    } else if (
      containerRef.current.scrollLeft ===
      scrollbarWidth - containerWidth
    ) {
      // if the scroll is at the end,scroll to the beginning
      containerRef.current.scrollLeft = containerWidth;
      // console.log("right end");
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles}
      // functional events
      onMouseDown={(e) => handleDrag(e)}
      onMouseMove={(e) => handleMove(e)}
      onMouseLeave={() => setMouseDown(false)}
      onMouseUp={() => setMouseDown(false)}
      onScroll={(e) => handleInfiniteScroll(e)}
    >
      {/* Duplication of code for Marquee */}
      <div
        className={`animate-marquee flex snap-start items-center gap-3.5 select-none group-hover:paused transition-transform duration-500 ease-linear`}
      >
        {children}
      </div>
      <div
        className={`animate-marquee flex snap-start items-center gap-3.5 select-none group-hover:paused transition-transform duration-500 ease-linear`}
        aria-hidden={true}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;
