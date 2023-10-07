import { Outlet } from "react-router-dom";
import Footer from "../HomePage/Footer";
const ProductLayout = () => {
  return (
    <div className="">
      <div className="mx-auto mt-12 max-w-screen-xl px-6 pb-20 md:px-10 lg:px-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ProductLayout;
