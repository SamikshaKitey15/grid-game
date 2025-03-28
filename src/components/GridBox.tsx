
import React from "react";
import { cn } from "@/lib/utils";

interface GridBoxProps {
  id: number;
  isClicked: boolean;
  clickSequence: number | null;
  isRevealing: boolean;
  onClick: (id: number) => void;
}

const GridBox: React.FC<GridBoxProps> = ({
  id,
  isClicked,
  clickSequence,
  isRevealing,
  onClick,
}) => {
  const handleClick = () => {
    if (!isClicked && !isRevealing) {
      onClick(id);
    }
  };

  const getBackgroundColor = () => {
    if (isRevealing && clickSequence !== null) {
      return "bg-amber-400 transition-colors duration-500";
    }
    return isClicked ? "bg-emerald-400" : "bg-slate-200";
  };

  return (
    <div
      className={cn(
        "w-full h-full rounded-lg shadow-md cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-105",
        getBackgroundColor()
      )}
      onClick={handleClick}
    >
      {isClicked && !isRevealing && (
        <span className="text-white font-bold text-xl">{clickSequence}</span>
      )}
    </div>
  );
};

export default GridBox;
