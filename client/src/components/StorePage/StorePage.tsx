import usePublicStores from "./hooks/usePublicStores";
import StoreCard from "@/shared/StoreCard";
import Spinner from "@/shared/Spinner";
const StorePage = () => {
  const { getAllPublicStores } = usePublicStores();
  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-20">
      <div className="mb-4 mt-6">
        <h2 className="text-2xl font-semibold">Stores</h2>
        <h4 className="mt-1 text-base font-medium text-slate-10">
          List of all the stores
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getAllPublicStores.isFetching ? (
          <div className="col-span-3 w-full">
            <Spinner />
          </div>
        ) : (
          getAllPublicStores.data?.map((store) => (
            <StoreCard
              key={store._id}
              title={store.name}
              description={store.description}
              img={store.logo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StorePage;
