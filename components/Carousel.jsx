"use client";
import React, {
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
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
  {
    title: "Hello WebWorld 4",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld 5",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld 6",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld 7",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld 8",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
  {
    title: "Hello WebWorld 9",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  },
];

// Elements prop: We take array of the elements from the user
const Carousel = ({
  rtl = false,
  elements = lists,
  autofill = true,
  children,
}) => {
  const duplicates = useMemo(() => {
    return autofill && elements.length <= 8 ? CloneList(elements) : elements;
  }, [elements, autofill]);

  const [mouseDownState, setMouseDownState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const childRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // here, we are getting each card width size using layoutEffect
  useLayoutEffect(() => {
    if (childRef.current) {
      const width = childRef.current.clientWidth;
      setCardWidth(width);
    }
  }, []);

  // console.log(containerRef.current);

  // MouseDown event was used to collect client X value and stored in the startX state
  const startDragging = (e) => {
    setMouseDownState(true);
    setStartX((prev) => e.clientX);
    setStartScrollLeft((prev) => containerRef.current.scrollLeft);
  };

  const move = (e) => {
    e.preventDefault();
    //
    if (!mouseDownState) {
      return;
    }
    const x = e.pageX - containerRef.current.offsetLeft; // container returns the X (horizontal) coordinate
    const scroll = (x - startX) * 1.25;
    containerRef.current.scrollLeft = startScrollLeft - scroll; //  scrollLeft value directly applied while mouseMove events occur
  };

  const infiniteScroll = (e) => {
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

  // const animate = () => {
  //   const scrollbarWidth = containerRef.current.scrollWidth;
  //   console.log(scrollbarWidth);
  //   setScrollPosition(scrollPosition - 1);
  //   if (scrollPosition <= -scrollbarWidth) {
  //     setScrollPosition(0);
  //   }
  //   requestAnimationFrame(animate);
  // };

  // useEffect(() => {
  //   animate();
  // });

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div
        className={`flex w-full p-5 gap-3.5 border-2 group snap-x snap-mandatory overflow-x-auto custom  ${
          mouseDownState
            ? "cursor-grabbing scroll-smooth transition-transform duration-500 ease-linear"
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
          className={`flex snap-start items-center gap-3.5 select-none group-hover:paused transition-transform duration-500 ease-linear`}
          // ref={childRef}
          style={{ transform: `translateX(${scrollPosition}px)` }}
        >
          {/* group-hover:paused ${
            rtl ? "animate-rtl_carousel" : "animate-horizontal_carousel"
          } */}
          {/* {duplicates.map((list, idx) => (
            <Card key={idx} list={list} childRef={childRef} />
          ))} */}
          {children}
        </div>
        <div
          className={`flex snap-start items-center gap-3.5 select-none group-hover:paused transition-transform duration-500 ease-linear`}
          aria-hidden="true"
          style={{ transform: `translateX(${scrollPosition}px)` }}
        >
          {/* {duplicates.map((list, idx) => (
            <Card key={`hidden-${idx}`} list={list} childRef={childRef} />
          ))} */}
          {children}
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
