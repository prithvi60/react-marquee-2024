"use client";
import React, {
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
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
const MultiSlider = ({ rtl = false, elements = lists, autofill = true }) => {
  const duplicates = useMemo(() => {
    return autofill && elements.length <= 8 ? CloneList(elements) : elements;
  }, [elements, autofill]);

  const [mouseDownState, setMouseDownState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const childRef = useRef(null);

  useLayoutEffect(() => {
    if (childRef.current) {
      const width = childRef.current.clientWidth;
      setCardWidth(width);
    }
  }, []);

  const startDragging = (e) => {
    // if (containerRef.current) {
    setMouseDownState(true);
    setStartX((prev) => e.clientX);
    // console.log(containerRef.current.scrollLeft);
    // console.log(e.target.scrollWidth - e.target.scrollLeft);
    setStartScrollLeft((prev) => containerRef.current.scrollLeft);
    // }
  };
  // console.log({ startX });

  const move = (e) => {
    e.preventDefault();

    if (!mouseDownState) {
      return;
    }
    // if (containerRef.current) {
    const x = e.clientX; // container returns the X (horizontal) coordinate
    const scroll = x - startX;
    containerRef.current.scrollLeft = startScrollLeft - scroll;
    // }
  };

  const infiniteScroll = (e) => {
    const containerWidth = containerRef.current.clientWidth;
    const scrollbarWidth = containerRef.current.scrollWidth;
    const totalCardWidth = duplicates.length * cardWidth;
    console.log(scrollbarWidth - containerWidth);
    // console.log(
    //   scrollbarWidth - (containerWidth + containerRef.current.scrollLeft)
    // );

    if (containerRef.current.scrollLeft === 0) {
      console.log("left end");
      containerRef.current.scrollLeft = scrollbarWidth - containerWidth;
    } else if (
      containerRef.current.scrollLeft ===
      scrollbarWidth - containerWidth
    ) {
      console.log("right end");
      // containerRef.current.scrollLeft =
      //   scrollbarWidth -
      //   (containerWidth + containerRef.current.scrollLeft) + 10;
    }
    // if (scrollX >= containerWidth - window.innerWidth) {
    //   containerRef.current.scrollLeft = 0;
    // } else if (scrollX < 0) {
    //   // setScrollX(containerWidth - totalCardWidth);
    //   containerRef.current.scrollLeft = containerWidth - totalCardWidth;
    // }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen scroll-smooth">
      <div
        className={`flex w-full p-5 gap-3.5 border-2 group snap-x snap-mandatory overflow-x-auto custom transition-all duration-300 ease-linear ${
          mouseDownState
            ? "cursor-grabbing scroll-smooth"
            : "cursor-pointer scroll-auto"
        }`}
        onMouseDown={(e) => startDragging(e)}
        onMouseMove={(e) => move(e)}
        onMouseLeave={() => setMouseDownState(false)}
        onMouseUp={() => setMouseDownState(false)}
        onScroll={(e) => infiniteScroll(e)}
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
        {/* <div
          className={`flex items-center gap-3.5 select-none group-hover:paused `}
          aria-hidden="true"
        >
          {duplicates.map((list, idx) => (
            <Card key={`hidden-${idx}`} list={list} childRef={childRef} />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default MultiSlider;

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
