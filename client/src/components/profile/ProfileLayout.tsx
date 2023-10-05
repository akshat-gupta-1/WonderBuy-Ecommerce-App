import { NavLink, Outlet } from "react-router-dom";
import { profileAccordion } from "../user/UserNav";
import { User, ShoppingBag, CreditCard, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const lookup: Record<string, LucideIcon> = {
  Account: User,
  Stores: ShoppingBag,
  Orders: CreditCard,
};
const ProfileLayout = () => {
  return (
    <div className="bg-blue-1">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
          <aside className="fixed top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-hidden  border-r border-slate-6 pr-3 pt-8 md:sticky md:block">
            <ul className="relative grid gap-y-2 text-slate-10">
              {profileAccordion.map((item, index) => {
                const Icon = lookup[item.title];
                return (
                  <NavLink
                    to={item.href}
                    key={index}
                    className={({ isActive }) =>
                      cn(
                        "flex rounded-md p-2 hover:bg-slate-4 hover:text-slate-12 ",
                        {
                          "bg-slate-4 text-slate-12": isActive,
                        },
                      )
                    }
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </NavLink>
                );
              })}
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

export default ProfileLayout;
