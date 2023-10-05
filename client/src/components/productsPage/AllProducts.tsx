import useAllProducts from "./hooks/useAllProducts";
import ProductCardPage from "@/shared/ProductCardPage";
const AllProducts = () => {
  const { getAllProducts } = useAllProducts();
  return (
    <div>
      <h2 className="p-4 text-2xl font-semibold">Results for All Products</h2>
      <ProductCardPage data={getAllProducts} />
    </div>
  );
};

export default AllProducts;
