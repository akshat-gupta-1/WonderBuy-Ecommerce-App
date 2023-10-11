import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IProductId } from "@/components/productsPage/hooks/useAllProducts";
interface ProductCardPageProps {
  data: UseQueryResult<IProductId[], unknown>;
}
const ProductCardPage = ({ data }: ProductCardPageProps) => {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.isFetching
        ? Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <ProductCardSkeleton />
            </div>
          ))
        : data.data?.map((product) => {
            return (
              <Link to={`/product/${product._id}`} key={product._id}>
                <ProductCard
                  title={product.name}
                  imgs={product.imageUrl}
                  price={product.price}
                />
              </Link>
            );
          })}
    </div>
  );
};

export default ProductCardPage;
