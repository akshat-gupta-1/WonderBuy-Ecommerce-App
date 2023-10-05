import { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  UserCircle2,
  User,
  LifeBuoy,
  FileText,
  LogOut,
  Menu,
  Plus,
  Minus,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from "../ui/sheet";
import useAuth from "../auth/hooks/useAuth";
import useUser from "./hooks/useUser";
import NavigationMenuRow from "@/shared/NavigationMenuRow";
import MobileAccordion from "@/shared/MobileAccordion";
import { components } from "@/shared/NavigationMenuRow";
import useCartQuery from "../cart/hooks/useCartQuery";
import useCheckout from "../cart/hooks/useCheckout";
export const profileAccordion: { title: string; href: string }[] = [
  {
    title: "Account",
    href: "/profile/account",
  },
  { title: "Stores", href: "/profile/stores" },
  { title: "Orders", href: "/profile/orders" },
];
const UserNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const { LogoutHandler } = useAuth();
  const { getCart, getCartCount, addProduct } = useCartQuery();
  const { checkout } = useCheckout();
  return (
    <div className="sticky inset-x-0 top-0 z-30 border-b border-slate-6 bg-blue-1 shadow-sm shadow-slate-6 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-20">
        <div className="mb-2 grid h-24 grid-cols-3 items-center pt-2 md:my-0 md:flex md:h-16 md:justify-between md:space-x-3 md:pt-0 ">
          <Link to="/" className="col-span-2 justify-self-start font-semibold">
            <span className="text-slate-12">Wonder</span>
            <span className="text-blue-11">Buy</span>
          </Link>
          <NavigationMenuRow />
          <div className="order-last col-span-3 mx-0 mt-2 flex w-full rounded-md border border-slate-7 px-2 md:order-none md:mt-0 md:w-[65%] lg:w-[30%]">
            <input
              type="text"
              className="h-10 w-full rounded-full bg-blue-1 p-3 text-slate-12 focus:outline-none "
              placeholder="Search Products"
            />
            <button className="ml-2 text-blue-11">
              <Search />
            </button>
          </div>
          <div className="col-span-1 flex items-center space-x-4 justify-self-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"blue"} className="relative">
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-10 text-xs text-white">
                    <span>{getCartCount.data}</span>
                  </div>
                  <ShoppingCart size={18} strokeWidth={2} />
                </Button>
              </SheetTrigger>
              <SheetContent className="min-w-full sm:min-w-[500px]">
                {getCartCount.data === 0 ? (
                  <div className="h-full w-full">
                    <SheetHeader className="border-b border-slate-7 pb-2 text-xl font-semibold">
                      Cart
                    </SheetHeader>
                    <div className="flex h-full w-full flex-col items-center justify-center space-y-2 text-slate-9">
                      <ShoppingCart size={65} />
                      <p className="text-xl font-medium">Your Cart is empty</p>
                      <p className="text-sm ">
                        Add items to your cart to checkout
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <SheetHeader className="border-b border-slate-7 pb-2 text-xl font-semibold">
                      Cart {`(${getCartCount.data})`}
                    </SheetHeader>
                    <div className="h-full w-full">
                      {getCart.data &&
                        getCart.data.items.map((item) => (
                          <div
                            className="flex justify-between border-b border-slate-7 py-4"
                            key={item.product._id}
                          >
                            <div className="flex space-x-2">
                              <img
                                src={item.product.imageUrl[0]}
                                alt=""
                                className="h-[75px] w-[75px] object-contain"
                              />
                              <div className="flex flex-col justify-center space-y-1">
                                <p className="text-lg font-semibold">
                                  {item.product.name}
                                </p>
                                <p className="text-sm font-medium text-slate-10">
                                  <span className="mr-1">Rs</span>
                                  {item.product.price}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-3">
                                <Button
                                  className="rounded-none border border-blue-8 p-1 px-2"
                                  variant={"blue"}
                                  onClick={() =>
                                    addProduct({
                                      productId: item.product._id,
                                      quantity: -1,
                                    })
                                  }
                                  disabled={item.quantity === 1}
                                >
                                  <Minus />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                  className="rounded-none border border-blue-8 p-1 px-2"
                                  variant={"blue"}
                                  onClick={() =>
                                    addProduct({
                                      productId: item.product._id,
                                      quantity: 1,
                                    })
                                  }
                                >
                                  <Plus />
                                </Button>
                              </div>
                              <Button
                                className="border border-blue-10 p-2"
                                variant={"blue"}
                                onClick={() =>
                                  addProduct({
                                    productId: item.product._id,
                                    quantity: 0,
                                  })
                                }
                              >
                                <Trash size={18} />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <SheetFooter className="absolute bottom-0 w-full border-t border-slate-7">
                      <div className="flex w-full flex-col space-y-4 py-2">
                        <div className="flex w-full items-center justify-between text-slate-9">
                          <h4 className="text-lg font-medium">Shipping</h4>
                          <p className="text-lg font-medium">Free</p>
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <h4 className="text-lg font-semibold">Total</h4>
                          <p className="text-lg font-semibold">
                            <span className="mr-1">Rs</span>
                            {getCart.data?.bill}
                          </p>
                        </div>
                        <Button
                          className="bg-blue-12 hover:bg-blue-11"
                          onClick={() => checkout.mutate()}
                        >
                          Checkout
                        </Button>
                      </div>
                    </SheetFooter>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-1 pt-2 text-blue-11 focus:outline-none">
                  <UserCircle2 size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel className="pb-0">
                  {user?.userName}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="py-0 text-xs font-medium text-slate-9">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile/account")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile/stores")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => LogoutHandler.refetch()}>
                  <LogOut className="mr-4 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="block px-1 pt-2 text-blue-11 focus:outline-none lg:hidden">
                  <Menu size={20} strokeWidth={2} />
                  <span className="sr-only">Toggle Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent className="">
                <MobileAccordion
                  setIsOpen={setIsOpen}
                  components={profileAccordion}
                  title="My Account"
                />
                <MobileAccordion
                  setIsOpen={setIsOpen}
                  components={components}
                  title="Categories"
                />
                <div className="mt-4 flex flex-col space-y-4 font-medium">
                  <Link to={"/categories/allproducts"}> All Products</Link>
                  <Link to={"/stores"}>Stores</Link>
                  <Link to={"/deals"}> Deals</Link>
                  <Link to={"/support"}>Support</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
