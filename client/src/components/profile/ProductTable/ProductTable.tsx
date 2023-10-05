import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Suspense } from "react";
import Spinner from "@/shared/Spinner";
import AddProduct from "./AddProduct";
const ProductTable = () => {
  const { storeId } = useParams();
  const { getProducts } = useProduct(storeId);
  return (
    <div className="w-[320px] sm:w-[550px] md:w-[480px] lg:w-[650px] xl:w-[750px]">
      <div className="grid grid-flow-col">
        <h2 className="self-center text-xl font-semibold">Product List</h2>
        <div className="my-4 self-center justify-self-end">
          <AddProduct />
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        {getProducts.data ? (
          <DataTable columns={columns} data={getProducts.data}></DataTable>
        ) : (
          <Spinner />
        )}
      </Suspense>
    </div>
  );
};

export default ProductTable;
