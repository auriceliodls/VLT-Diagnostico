import React from 'react';
import { cn } from '../../utils/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  id?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title, id }) => (
  <div id={id} className={cn("bg-[#0d1321] border border-[#2a2b2f] rounded-xl shadow-sm overflow-hidden", className)}>
    {title && (
      <div className="px-4 py-3 border-b border-[#2a2b2f] bg-[#080d1a]/50">
        <h3 className="text-sm font-bold text-neutral-200 uppercase tracking-wider">{title}</h3>
      </div>
    )}
    <div className="p-4">
      {children}
    </div>
  </div>
);
