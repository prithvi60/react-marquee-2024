"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { MarqueeProps } from "./type"; // Ensure this is properly defined

// Define types for event handlers
type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

// Define the Marquee component
const Marquee: React.FC<MarqueeProps> = ({
  children,
}) => {
  // Define refs with non-null assertions for TypeScript
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  // State hooks
  const [mouseDown, setMouseDown] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const marqueeElement = containerRef.current;
    if (!marqueeElement) return;

    const totalWidth = marqueeElement.scrollWidth;
    const visibleWidth = marqueeElement.clientWidth;
    const cardWidth = containerRef2.current?.children[0]?.scrollWidth || 0;

    if (mouseDown) {
      // If mouseDown is true, we don't set up the animation
      return;
    }

    const animate = () => {
      setScrollPosition((prevPosition) => {
        if (prevPosition >= totalWidth - (visibleWidth + cardWidth)) {
          return 0;
        }
        return prevPosition + 1;
      });
    };

    const intervalId = setInterval(animate, 5);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [mouseDown]);

  // Memoized styles
  const styles = useMemo(
    () =>
      `flex w-full p-5 gap-3.5 border-2 group snap-x snap-mandatory overflow-x-auto custom ${mouseDown
        ? "cursor-grabbing scroll-smooth transition-transform duration-500 ease-linear"
        : "cursor-pointer scroll-auto"
      }`,
    [mouseDown]
  );

  // Event handlers
  const handleDrag: MouseEventHandler = (e) => {
    setMouseDown(true);
    setClientX(e.pageX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMove: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!mouseDown) return;

    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const scroll = (x - clientX) * 1.25;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - scroll;
    }
  };

  const handleInfiniteScroll: React.WheelEventHandler<HTMLDivElement> = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const scrollbarWidth = containerRef.current?.scrollWidth || 0;

    if (containerRef.current) {
      if (containerRef.current.scrollLeft === 0) {
        containerRef.current.scrollLeft = scrollbarWidth - 2 * containerWidth;
      } else if (containerRef.current.scrollLeft === scrollbarWidth - containerWidth) {
        containerRef.current.scrollLeft = containerWidth;
      }
    }
  };

  // Render the marquee
  const renderMarquee = (isHidden: boolean) => (
    <div
      style={{
        transform: `translateX(-${scrollPosition}px)`,
      }}
      ref={containerRef2}
      data-testid="containerId2"
      className="flex snap-start items-center gap-3.5 select-none transition-transform duration-300 ease-linear scroll-auto"
      aria-hidden={isHidden}
    >
      {children}
    </div>
  );

  return (
    <>
      <h2 data-testid="test2" className={"text-2xl font-bold text-center w-full hidden"}>Marquee Library</h2>
      <div
        ref={containerRef}
        className={styles}
        data-testid="containerId"
        // Event handlers
        onScroll={handleInfiniteScroll}
        onMouseDown={handleDrag}
        onMouseMove={handleMove}
        onMouseLeave={() => setMouseDown(false)}
        onMouseUp={() => setMouseDown(false)}
      >
        {renderMarquee(false)}
        {renderMarquee(true)}
      </div>
    </>
  );
};

export default Marquee;