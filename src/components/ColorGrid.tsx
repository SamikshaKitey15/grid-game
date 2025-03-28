
import React, { useState, useEffect } from "react";
import GridBox from "./GridBox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ColorGrid: React.FC = () => {
  const [clickedBoxes, setClickedBoxes] = useState<number[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealIndex, setRevealIndex] = useState<number | null>(null);
  const gridSize = 3;
  const totalBoxes = gridSize * gridSize;

  const handleBoxClick = (id: number) => {
    if (isRevealing) return;
    
    const newClickedBoxes = [...clickedBoxes, id];
    setClickedBoxes(newClickedBoxes);
    
    if (newClickedBoxes.length === totalBoxes) {
      startRevealSequence();
    }
  };

  const startRevealSequence = () => {
    setIsRevealing(true);
    setRevealIndex(0);
    toast("Revealing sequence!", {
      description: "Watch as the boxes change to orange in the order you clicked them."
    });
  };

  const resetGrid = () => {
    setClickedBoxes([]);
    setIsRevealing(false);
    setRevealIndex(null);
    toast("Grid reset!", {
      description: "Start a new sequence."
    });
  };

  useEffect(() => {
    if (isRevealing && revealIndex !== null) {
      if (revealIndex < clickedBoxes.length) {
        const timer = setTimeout(() => {
          setRevealIndex(revealIndex + 1);
        }, 600);
        return () => clearTimeout(timer);
      } else {
        // All boxes revealed
        const timer = setTimeout(() => {
          toast("Sequence complete!", {
            description: "All boxes have been revealed in your click order."
          });
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [isRevealing, revealIndex, clickedBoxes.length]);

  const getClickSequence = (id: number) => {
    const index = clickedBoxes.indexOf(id);
    return index !== -1 ? index + 1 : null;
  };

  const isInRevealSequence = (id: number) => {
    if (!isRevealing || revealIndex === null) return false;
    const index = clickedBoxes.indexOf(id);
    return index !== -1 && index < revealIndex;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {Array.from({ length: totalBoxes }).map((_, index) => {
          const id = index + 1;
          return (
            <div key={id} className="aspect-square">
              <GridBox
                id={id}
                isClicked={clickedBoxes.includes(id)}
                clickSequence={getClickSequence(id)}
                isRevealing={isInRevealSequence(id)}
                onClick={handleBoxClick}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex space-x-4">
        <Button 
          onClick={resetGrid}
          variant="outline"
          className="px-6"
        >
          Reset Grid
        </Button>
        
        <Button
          onClick={startRevealSequence}
          disabled={clickedBoxes.length !== totalBoxes || isRevealing}
          className="px-6 bg-amber-500 hover:bg-amber-600"
        >
          Reveal Sequence
        </Button>
      </div>
    </div>
  );
};

export default ColorGrid;
