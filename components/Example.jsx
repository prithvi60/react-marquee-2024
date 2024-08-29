"use client"

import Marquee from "./Marquee";
import { ExampleCard } from "./ExampleCard";
import React, { Profiler } from 'react';


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
  // const onRenderCallback = (
  //   id,
  //   phase,
  //   actualDuration,
  //   baseDuration,
  //   startTime,
  //   commitTime,
  //   interactions
  // ) => {
  //   console.log("id",id);
  //   console.log("phase",phase);
  //   console.log("actualDuration",actualDuration);
  //   console.log("baseDuration",baseDuration);
  //   console.log("startTime",startTime);
  //   console.log("commitTime",commitTime);
  //   console.log("interactions",interactions);
  // };
  return (
    // <Profiler id="MarqueeComponent" onRender={onRenderCallback}>
      <Marquee>
        {lists.map((list, idx) => (
          <ExampleCard key={idx} list={list} />
        ))}
      </Marquee>
    // </Profiler>
  );
};

export default Example;
