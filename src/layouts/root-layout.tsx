import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
