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
const Carousel = ({ rtl = true }) => {
  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="flex w-full p-5 gap-3.5 overflow-hidden border-2 group">
        <div
          className={`flex items-center gap-3.5  group-hover:paused ${
            rtl === true
              ? "animate-rtl_carousel"
              : "animate-horizontal_carousel"
          }  `}
        >
          {lists.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
        <div
          className={`flex items-center gap-3.5  group-hover:paused ${
            rtl === true
              ? "animate-rtl_carousel"
              : "animate-horizontal_carousel"
          }  `}
          aria-hidden="true"
        >
          {lists.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
