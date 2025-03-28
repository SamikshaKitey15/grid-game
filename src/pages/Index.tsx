
import ColorGrid from "@/components/ColorGrid";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Mindful Colors Grid</h1>
          <p className="text-slate-600">
            Click each box to change it to green. After clicking all boxes, watch as they turn orange in your click sequence.
          </p>
        </div>
        
        <ColorGrid />

        <div className="mt-10 text-center text-sm text-slate-500">
          <p>Click boxes in any order. The sequence will be revealed after all boxes are clicked.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
