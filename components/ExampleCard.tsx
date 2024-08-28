import React from 'react';
import { ExampleCardProps } from './type';

// Define the ExampleCard component with TypeScript
export const ExampleCard: React.FC<ExampleCardProps> = ({ list }) => {
  return (
    <div
      data-testid="test"
      className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
    >
      <h2 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
        {list.title}
      </h2>
      <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
        {list.desc}
      </p>
    </div>
  );
};