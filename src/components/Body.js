import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
