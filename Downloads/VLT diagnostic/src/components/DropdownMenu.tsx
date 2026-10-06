import React, { useState } from 'react';
import { cn } from '../utils/utils';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  label: string;
  icon?: React.ElementType;
  items: { id: string; label: string; icon?: React.ElementType; onClick: () => void; isActive: boolean }[];
  isActive: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, icon: Icon, items, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 tracking-wide select-none outline-none cursor-pointer",
          isActive
            ? "bg-gradient-to-r from-[#005CAA] to-[#004C8F] text-white shadow-lg shadow-[#005CAA]/20 font-bold scale-[1.02]"
            : "text-[#8e9299] hover:text-white hover:bg-white/[0.04]"
        )}
      >
        {Icon && <Icon size={14} className={cn("transition-colors", isActive ? "text-white" : "text-[#8e9299]")} />}
        <span>{label}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1b1e] border border-[#2a2b2f] rounded-xl shadow-xl z-50 p-1">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                item.isActive ? "bg-white/10 text-white" : "text-[#8e9299] hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon && <item.icon size={14} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
