import React, { useMemo } from "react";
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
  // {
  //   title: "Hello WebWorld4",
  //   desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  // },
  // {
  //   title: "Hello WebWorld5",
  //   desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  // },
  // {
  //   title: "Hello WebWorld6",
  //   desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore exercitationem quisquam nemo laborum, accusamus consequuntur optio.",
  // },
];
// Elements prop: We take array of the elements from the user
const Carousel = ({ rtl = true, elements = lists, autofill = true }) => {
  const duplicates = useMemo(() => {
    return autofill && elements.length <= 8 ? CloneList(elements) : elements;
  }, [elements, autofill]);

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="flex w-full p-5 gap-3.5 overflow-hidden border-2 group">
        <div
          className={`flex items-center gap-3.5 group-hover:paused ${
            rtl ? "animate-rtl_carousel" : "animate-horizontal_carousel"
          }`}
        >
          {duplicates.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
        <div
          className={`flex items-center gap-3.5 group-hover:paused ${
            rtl ? "animate-rtl_carousel" : "animate-horizontal_carousel"
          }`}
          aria-hidden="true"
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
