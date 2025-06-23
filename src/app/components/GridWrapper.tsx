import React from 'react';

interface GridWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const GridWrapper: React.FC<GridWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`container grid grid-cols-12 gap-5 ${className}`}>
      {children}
    </div>
  );
};

export default GridWrapper;

// Uso:
// <GridWrapper className="mt-10">
//   <div className="col-span-4 bg-gray-200 p-4">Columna 1</div>
//   <div className="col-span-8 bg-gray-200 p-4">Columna 2</div>
// </GridWrapper>
