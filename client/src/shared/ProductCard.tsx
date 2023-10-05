import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
interface ProductCardProps {
  title: string;
  price: number;
  imgs: string[];
  button?: boolean;
}
const ProductCard = ({
  title,
  price,
  imgs,
  button = false,
}: ProductCardProps) => {
  const img = imgs[0];
  return (
    <Card className=" group h-[375px] cursor-pointer overflow-hidden">
      <div className="flex w-full justify-center border-b border-slate-7">
        <img
          src={img}
          alt={`${title} image`}
          className="h-[250px] w-[250px]  object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex h-full flex-col space-y-1 p-4 group-hover:bg-slate-3">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-[15px] font-medium text-slate-9">
          <span className="mr-1">Rs</span>
          {price}
        </p>
      </div>
      {button && (
        <Button className="w-full bg-blue-9 text-white">Add To Cart</Button>
      )}
    </Card>
  );
};

export default ProductCard;
