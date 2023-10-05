import { Outlet, NavLink } from "react-router-dom";
import { components } from "@/shared/NavigationMenuRow";
import * as Slider from "@radix-ui/react-slider";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const ProductsPageLayout = () => {
  const [initial, setInitial] = useState<number>(0);
  const [final, setFinal] = useState<number>(2000);
  return (
    <div className="bg-blue-1">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
          <aside className="fixed top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-hidden  border-r border-slate-6 pr-3 pt-8 md:sticky md:block">
            <ul className="relative grid gap-y-2 text-slate-10">
              <div className="mb-1 border-b border-slate-12 pb-2 text-base font-semibold text-slate-12">
                Categories
              </div>
              <div className="flex flex-col space-y-2 text-sm">
                <NavLink
                  to={"/categories/allproducts"}
                  className={({ isActive }) =>
                    cn("hover:text-slate-11", {
                      "text-slate-12": isActive,
                    })
                  }
                >
                  All Products
                </NavLink>
                {components.map((component) => (
                  <NavLink
                    key={component.title}
                    to={component.href}
                    className={({ isActive }) =>
                      cn("hover:text-slate-11", {
                        "text-slate-10": isActive,
                      })
                    }
                  >
                    {component.title}
                  </NavLink>
                ))}
              </div>
              <div className=" mb-2 mt-2 border-b border-slate-12 pb-2 text-base font-semibold text-slate-12">
                Filter By Price
              </div>
              <form className="flex flex-col space-y-4">
                <Slider.Root
                  className="relative flex h-5 w-full touch-none select-none items-center px-2"
                  defaultValue={[0, 2000]}
                  max={21000}
                  step={2000}
                  minStepsBetweenThumbs={1}
                  value={[initial, final]}
                  onValueChange={(value) => {
                    setInitial(value[0]);
                    setFinal(value[1]);
                  }}
                >
                  <Slider.Track className="relative h-[3px] grow rounded-[9999px] bg-blue-6">
                    <Slider.Range className="absolute h-full rounded-[9999px] bg-blue-11" />
                  </Slider.Track>
                  <Slider.Thumb className="hover: block h-4 w-4 rounded-[10px] bg-blue-11  hover:bg-blue-10 focus:outline-none" />
                  <Slider.Thumb className="hover: block h-4 w-4 rounded-[10px] bg-blue-11 hover:bg-blue-10 focus:outline-none" />
                </Slider.Root>
                <div className="flex items-center">
                  <span className="px-1">Rs</span>
                  <Input
                    className="w-20 text-sm focus-visible:ring-0"
                    type="text"
                    value={initial}
                    onChange={(e) => setInitial(Number(e.target.value))}
                  />
                  <span className="px-4">to</span>
                  <Input
                    className="w-20 text-sm focus-visible:ring-0"
                    value={final}
                    onChange={(e) => setFinal(Number(e.target.value))}
                  />
                </div>
                <Button variant={"gray"} className="w-24">
                  Apply
                </Button>
              </form>
            </ul>
          </aside>
          <div className="flex justify-center md:justify-normal">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageLayout;
