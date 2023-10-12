import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Plus, Minus, Trash } from "lucide-react";
import NavigationMenuRow from "@/shared/NavigationMenuRow";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from "../ui/sheet";
import MobileAccordion from "@/shared/MobileAccordion";
import { components } from "@/shared/NavigationMenuRow";
import { useCart } from "../cart/hooks/useCart";
import SearchInput from "../search/SearchInput";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, cartCount, totalPrice } = useCart(
    (state) => ({
      items: state.items,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      cartCount: state.cartCount,
      totalPrice: state.totalPrice,
    }),
  );
  return (
    <div className="sticky inset-x-0 top-0 z-30 border-b border-slate-6 bg-blue-1 shadow-sm shadow-slate-6 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-20">
        <div className="mb-2 grid h-24 grid-cols-3 items-center pt-2 md:my-0 md:flex md:h-16 md:justify-between md:space-x-3 md:pt-0">
          <Link to="/" className="col-span-2 justify-self-start font-semibold">
            <span className="text-slate-12">Wonder</span>
            <span className="text-blue-11">Buy</span>
          </Link>
          <NavigationMenuRow />
          <SearchInput />
          <div className="col-span-1 flex items-center space-x-4 justify-self-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"blue"} className="relative">
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-10 text-xs text-white">
                    <span>{cartCount()}</span>
                  </div>
                  <ShoppingCart size={18} strokeWidth={2} />
                </Button>
              </SheetTrigger>
              <SheetContent className="min-w-full sm:min-w-[500px]">
                {items.length === 0 ? (
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
                      Cart {`(${cartCount()})`}
                    </SheetHeader>
                    <div className="overflow-y-scroll">
                      {items.map((item) => (
                        <div
                          className="flex justify-between border-b border-slate-7 py-4"
                          key={item._id}
                        >
                          <div className="flex space-x-2">
                            <img
                              src={item.imageUrl[0]}
                              alt=""
                              className="xs:h-[75px] xs:w-[75px] h-[50px] w-[50px] object-contain"
                            />
                            <div className="flex flex-col justify-center space-y-1">
                              <p className="xs:text-lg text-sm font-semibold">
                                {item.name}
                              </p>
                              <p className="text-sm font-medium text-slate-10">
                                <span className="mr-1">Rs</span>
                                {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="xs:space-x-6 flex items-center space-x-2">
                            <div className="flex items-center space-x-3">
                              <Button
                                className="xs:h-10 xs:w-10 h-8 w-8 rounded-none border border-blue-8 p-1 px-2"
                                variant={"blue"}
                                onClick={() =>
                                  updateQuantity(item._id, "decrease")
                                }
                                disabled={item.quantity === 1}
                              >
                                <Minus />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button
                                className="xs:h-10 xs:w-10 h-8 w-8 rounded-none border border-blue-8 p-1 px-2"
                                variant={"blue"}
                                onClick={() =>
                                  updateQuantity(item._id, "increase")
                                }
                              >
                                <Plus />
                              </Button>
                            </div>
                            <Button
                              className="xs:h-10 xs:w-10 h-8 w-8 border border-blue-10 p-2"
                              variant={"blue"}
                              onClick={() => removeItem(item._id)}
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
                            {totalPrice()}
                          </p>
                        </div>
                        <Button
                          className="bg-blue-12 hover:bg-blue-11"
                          onClick={() => navigate("/auth/signin")}
                        >
                          Checkout
                        </Button>
                      </div>
                    </SheetFooter>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            <Button variant={"blue"} className="min-w-[80px]">
              <Link to="/auth/signin">Sign In</Link>
            </Button>
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
                  title="Category"
                  components={components}
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

export default NavBar;
