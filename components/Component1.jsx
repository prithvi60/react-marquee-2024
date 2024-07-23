import React from 'react'
import Carousel from './Carousel'
import Card from './Card';
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
    }
  ];

const Component1 = () => {
  return (
    <Carousel >
        {lists.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
    </Carousel>
  )
}

export default Component1
