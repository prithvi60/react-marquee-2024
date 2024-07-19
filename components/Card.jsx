const Card = ({ list, childRef }) => {
  return (
    <div
      className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
      ref={childRef}
    >
      <h4 className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
        {list.title}
      </h4>
      <p className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
        {list.desc}
      </p>
    </div>
  );
};

export default Card;
