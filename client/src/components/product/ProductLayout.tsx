import { Outlet } from "react-router-dom";
const ProductLayout = () => {
  return (
    <div className="mx-auto mt-12 max-w-screen-xl px-6 md:px-10 lg:px-20">
      <Outlet />
    </div>
  );
};

export default ProductLayout;
