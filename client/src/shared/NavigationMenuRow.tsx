import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
export const components: { title: string; href: string; img: string }[] = [
  {
    title: 'Furniture',
    href: '/categories/furniture',
    img: '/assets/imgs/furniture.png',
  },
  {
    title: 'Electronics',
    href: '/categories/electronics',
    img: '/assets/imgs/laptop.png',
  },
  {
    title: 'Fashion',
    href: '/categories/fashion',
    img: '/assets/imgs/fashion.png',
  },
  { title: 'Books', href: '/categories/books', img: '/assets/imgs/books.png' },
  {
    title: 'Beauty',
    href: '/categories/beauty',
    img: '/assets/imgs/beauty.png',
  },
];
interface ListItemProps extends ComponentPropsWithRef<'a'> {
  title: string;
  img: string;
  href: string;
}
const ListItem = forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, children, href, img, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link
            ref={ref}
            to={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="grid grid-cols-2 gap-x-2">
              <img
                src={img}
                alt={`${title} image`}
                className="h-[70px] w-[70px] object-contain"
              />
              <div className="text-sm font-semibold text-slate-12 leading-none self-center">
                {title}
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
const NavigationMenuRow = () => {
  return (
    <div className="lg:block hidden">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="text-slate-12">Category</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-6 md:w-[400px] lg:w-[600px]">
                <p className="pb-4 font-bold text-slate-12">Popular Products</p>
                <div className="border-b w-full border-slate-4" />
                <ul className="grid grid-cols-2">
                  {components.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      img={item.img}
                    ></ListItem>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/categories/allproducts"
            >
              <span className="text-slate-12">All Products</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/stores"
            >
              <span className="text-slate-12">Stores</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/deals"
            >
              <span className="text-slate-12">Deals</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationMenuRow;
