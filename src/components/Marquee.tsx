import React, {
  useRef,
  useState,
  //   useEffect,
  useMemo,
  //   MouseEventHandler,
} from "react";
import { MarqueeProps } from "./type";
import "../global.css";
const Marquee: React.FC<MarqueeProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mouseDown, setMouseDown] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const styles = useMemo(
    () =>
      `flex w-full p-5 gap-3.5 group snap-x snap-mandatory overflow-x-auto custom custom2 ${
        mouseDown
          ? "cursor-grabbing scroll-smooth transition-transform duration-500 ease-linear"
          : "cursor-pointer scroll-auto"
      }`,
    [mouseDown]
  );

  // MouseDown event was used to collect client X value and stored in the ClientX state
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setClientX(() => e.pageX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft; // container returns the X (horizontal) coordinate
      const scroll = (x - clientX) * 1.25;
      containerRef.current.scrollLeft = scrollLeft - scroll; //  scrollLeft value directly applied while mouseMove events occur
    }
  };

  const handleInfiniteScroll = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const scrollbarWidth = containerRef.current.scrollWidth;

      if (containerRef.current.scrollLeft === 0) {
        // if the scroll is at the beginning,scroll to the end
        containerRef.current.scrollLeft = scrollbarWidth - 2 * containerWidth;
      } else if (
        containerRef.current.scrollLeft ===
        scrollbarWidth - containerWidth
      ) {
        // if the scroll is at the end,scroll to the beginning
        containerRef.current.scrollLeft = containerWidth;
      }
    }
  };

  const renderMarquee = (isHidden: boolean) => (
    <div
      className="flex snap-start items-center gap-3.5 select-none transition-transform duration-500 ease-linear"
      aria-hidden={isHidden}
    >
      {children}
    </div>
  );
  return (
    <div
      ref={containerRef}
      className={styles}
      onScroll={handleInfiniteScroll}
      onMouseDown={handleDrag}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouseDown(false)}
      onMouseUp={() => setMouseDown(false)}
    >
      {renderMarquee(false)}
      {renderMarquee(true)}
    </div>
  );
};

export default Marquee;
