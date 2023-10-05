import { Card } from "@/components/ui/card";
interface StoreCardProps {
  title: string;
  img: string;
  description: string;
}
const StoreCard = ({ title, img, description }: StoreCardProps) => {
  return (
    <Card>
      <div className="flex items-center space-x-4 border-b border-slate-7 p-4">
        <img
          src={img}
          alt={`${title} image`}
          className="h-[125px] w-[125px] rounded-full border border-slate-7 object-contain"
        />
        <p className="text-2xl font-semibold">{title}</p>
      </div>
      <div className="p-4">
        <p className="text-base font-medium">Description</p>
        <p className="text-sm text-slate-10">{description}</p>
      </div>
    </Card>
  );
};

export default StoreCard;
