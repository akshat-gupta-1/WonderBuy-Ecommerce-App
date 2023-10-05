import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "../ui/toaster";
import AuthLayout from "../auth/AuthLayout";
import { queryClient } from "@/lib/reactQuery";
import ProfileLayout from "../profile/ProfileLayout";
import Account from "../profile/Account";
import Stores from "../profile/Stores";
import Orders from "../profile/Orders";
import Homepage from "./Homepage";
import Protected from "./Protected";
import StoreDetailsLayout from "../profile/StoreDetailsLayout";
import ProductTable from "../profile/ProductTable/ProductTable";
import StoreDetails from "../profile/StoreDetails";
import ProductsPageLayout from "../productsPage/ProductsPageLayout";
import AllProducts from "../productsPage/AllProducts";
import Categories from "../productsPage/Categories";
import ProductLayout from "../product/ProductLayout";
import Product from "../product/Product";
import StorePage from "../StorePage/StorePage";
import { useTokenStore } from "../auth/hooks/useToken";
const App = () => {
  const token = useTokenStore((state) => state.accessToken);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Router>
          <Routes>
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/auth/" element={<AuthLayout />}>
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="/" element={<Home />}>
              <Route index element={<Homepage />} />
              <Route
                path="profile/"
                element={
                  <Protected token={token}>
                    <ProfileLayout />
                  </Protected>
                }
              >
                <Route index element={<Account />} />
                <Route path="account" element={<Account />} />
                <Route path="stores" element={<Stores />} />
                <Route path="stores/:storeId" element={<StoreDetailsLayout />}>
                  <Route index element={<StoreDetails />} />
                  <Route path="products" element={<ProductTable />} />
                </Route>
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="categories/" element={<ProductsPageLayout />}>
                <Route index element={<AllProducts />} />
                <Route path="allproducts" element={<AllProducts />} />
                <Route path=":category" element={<Categories />} />
              </Route>
              <Route path="product/:productId" element={<ProductLayout />}>
                <Route index element={<Product />} />
              </Route>
              <Route path="stores" element={<StorePage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
