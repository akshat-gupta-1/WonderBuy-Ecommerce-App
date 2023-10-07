import ProductCardSkeleton from "@/shared/ProductCardSkeleton";
import ProductCard from "@/shared/ProductCard";
import { Link } from "react-router-dom";
import useAllProducts from "../productsPage/hooks/useAllProducts";
const FeaturedProducts = () => {
  const { getAllProducts, data } = useAllProducts();
  return (
    <div className="mt-20 flex flex-col items-center">
      <h4 className="text-2xl font-bold underline decoration-blue-11 decoration-wavy underline-offset-8">
        Featured Products
      </h4>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getAllProducts.isFetching
          ? Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>
                <ProductCardSkeleton />
              </div>
            ))
          : data?.map((item) => {
              return (
                <Link to={`/product/${item._id}`}>
                  <ProductCard
                    title={item.name}
                    imgs={item.imageUrl}
                    price={item.price}
                  />
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
