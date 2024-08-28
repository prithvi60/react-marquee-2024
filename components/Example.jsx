import React from "react";
import Marquee from "./Marquee";
import { ExampleCard } from "./ExampleCard";


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

const Example = () => {
  return (
    <Marquee>
      {lists.map((list, idx) => (
        <ExampleCard key={idx} list={list} />
      ))}
    </Marquee>
  );
};

export default Example;
