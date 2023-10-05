import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
const ProductCardSkeleton = () => {
  return (
    <Card className="">
      <Skeleton className="h-[250px] w-[250px]" />
      <div className="mt-1 flex w-full flex-col space-y-1 p-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[100px]" />
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
