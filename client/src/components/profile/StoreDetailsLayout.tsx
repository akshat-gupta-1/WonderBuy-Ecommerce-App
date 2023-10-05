import { cn } from "@/lib/utils";
import { NavLink, Outlet, useParams } from "react-router-dom";
const StoreDetailsLayout = () => {
  const { storeId } = useParams();
  return (
    <div className="px-8 pt-8">
      <h2 className="text-3xl font-bold text-slate-12">Manage Your Store</h2>
      <h4 className="py-1 font-medium text-slate-9">Edit Details of Store</h4>
      <div className="mt-4 flex w-[320px] space-x-4 border-b border-slate-6 sm:w-[550px] md:w-[480px] lg:w-[650px] xl:w-[750px]">
        <NavLink
          to={`/profile/stores/${storeId}`}
          className={({ isActive }) =>
            cn("pb-3", {
              "border-b-2 border-slate-10": isActive,
            })
          }
          end
        >
          <span className="rounded-sm p-2 text-sm font-medium hover:bg-slate-6">
            Store
          </span>
        </NavLink>
        <NavLink
          to={`/profile/stores/${storeId}/products`}
          className={({ isActive }) =>
            cn("pb-3", {
              "border-b-2 border-slate-10": isActive,
            })
          }
        >
          <span className="mb-1 rounded-sm p-2 text-sm font-medium hover:bg-slate-6">
            Products
          </span>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default StoreDetailsLayout;
