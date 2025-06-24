import React from 'react';

interface GridWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const GridWrapper: React.FC<GridWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full grid grid-cols-12 gap-4 px-6 sm:px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default GridWrapper;