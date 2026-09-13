import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'default' | 'full' | 'narrow';
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'default',
  className = '',
}) => {
  const maxWidthClasses = {
    default: 'max-w-7xl',
    full: 'max-w-full',
    narrow: 'max-w-4xl',
  }[maxWidth];

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 ${maxWidthClasses} ${className}`}>
      {children}
    </div>
  );
};
