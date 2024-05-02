import { RotateCw } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex animate-spin items-center justify-center">
      <RotateCw size={64} />
    </div>
  );
};

export default Loading;
