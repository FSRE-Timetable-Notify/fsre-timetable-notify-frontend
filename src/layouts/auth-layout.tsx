import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
