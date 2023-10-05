import { useParams } from "react-router-dom";
import useItem from "./hooks/useItem";
import { Plus, Minus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useCart } from "../cart/hooks/useCart";
import { useToast } from "../ui/use-toast";
import useUser from "../user/hooks/useUser";
import useCartQuery from "../cart/hooks/useCartQuery";
const Product = () => {
  const { productId } = useParams();
  const [counter, setCounter] = useState<number>(0);
  const { getItemDetails } = useItem(productId);
  const [image, setImage] = useState<string | undefined>("");
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();
  const { addProduct } = useCartQuery();
  const { user } = useUser();
  useEffect(() => {
    setImage(getItemDetails.data?.imageUrl[0]);
  }, [getItemDetails.data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(300px,_1fr)_minmax(300px,_500px)]">
      <div>
        <div className="mb-4 flex justify-center">
          <img
            src={image}
            alt={`${getItemDetails.data?.name} image`}
            className="max-h-[600px] max-w-[600px] "
          />
        </div>
        <div className="flex justify-center space-x-2">
          {getItemDetails.data?.imageUrl.map((item) => (
            <img
              key={item}
              src={item}
              className="h-[100px] w-[100px] cursor-pointer object-contain hover:border hover:border-slate-7"
              onMouseOver={() => setImage(item)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-4 p-4">
        <div className="border-b border-slate-4 pb-2">
          <p className="text-sm font-medium text-slate-10">
            {getItemDetails.data?.category}
          </p>
          <h4 className="my-3 text-3xl font-semibold">
            {getItemDetails.data?.name}
          </h4>
          <p className="text-lg font-semibold text-blue-11">
            <span className="mr-1">Rs</span>
            {getItemDetails.data?.price}
          </p>
        </div>
        <div className="flex flex-col space-y-2 border-b border-slate-4 pb-2">
          <p className="text-sm font-medium text-slate-10">Description</p>
          <p className="font-medium">{getItemDetails.data?.description}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-xl font-semibold">Quantity</p>
          <div className="flex items-center space-x-3">
            <Button
              className="rounded-none border border-blue-8 p-1 px-2"
              variant={"blue"}
              onClick={() => setCounter((prev) => prev - 1)}
              disabled={counter === 0}
            >
              <Minus />
            </Button>
            <span>{counter}</span>
            <Button
              className="rounded-none border border-blue-8 p-1 px-2"
              variant={"blue"}
              onClick={() => setCounter((prev) => prev + 1)}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <Button
          className="bg-blue-12 hover:bg-blue-11"
          onClick={() => {
            if (!(counter === 0)) {
              if (user) {
                if (getItemDetails.data) {
                  addProduct({
                    productId: getItemDetails.data._id!,
                    quantity: counter,
                  });
                }
              } else {
                addItem({ ...getItemDetails.data!, quantity: counter });
              }
              return toast({
                action: (
                  <div className="flex w-full items-center">
                    <Check className="mr-2" />
                    <span>{`Successfully Added to Cart`}</span>
                  </div>
                ),
              });
            }
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
