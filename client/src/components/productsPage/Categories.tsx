import { useParams } from "react-router-dom";
import useCategory from "./hooks/useCategory";
import ProductCardPage from "@/shared/ProductCardPage";
const Categories = () => {
  const { category } = useParams();
  const { getProductsByCategory } = useCategory({ category });
  return (
    <div>
      <h2 className="p-4 text-2xl font-semibold">
        Results for{" "}
        {`${category?.charAt(0).toUpperCase()}${category?.slice(1)}`}
      </h2>
      <ProductCardPage data={getProductsByCategory} />
    </div>
  );
};

export default Categories;
