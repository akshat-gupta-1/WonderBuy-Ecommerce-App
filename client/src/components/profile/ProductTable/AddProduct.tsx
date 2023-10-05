import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { ChangeEvent } from "react";
import { useState } from "react";
import useProduct from "../hooks/useProduct";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const productCategories = [
  "Furniture",
  "Electronics",
  "Fashion",
  "Books",
  "Beauty",
] as const;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addProductValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is Required")
    .max(30, "Name should be atmost 30 characters long"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(30, "Description should be atleast 10 characters long")
    .max(500, "Description cannot be this long"),
  category: z.enum(productCategories, {
    required_error: "Category is required",
  }),
  price: z.string().min(1, "Price is required").regex(/^\d+$/, "Invalid input"),
  imageUrl: z.string().array().min(1, "Atleast one image is required"),
});
type addProductType = z.infer<typeof addProductValidator>;
const AddProduct = () => {
  const { storeId } = useParams();
  const [open, isOpen] = useState<boolean>(false);
  const { addProduct } = useProduct(storeId);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<addProductType>({
    resolver: zodResolver(addProductValidator),
  });
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageUrls: string[] = [];
    if (files) {
      clearErrors("imageUrl");
      const filePromises = Array.from(files).map((file) => {
        return new Promise<void>((resolve, reject) => {
          if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
              imageUrls.push(reader.result as string);
              resolve();
            };
            reader.onerror = () => {
              reject(`Error reading ${file.name}`);
            };
            reader.readAsDataURL(file);
          } else {
            setError("imageUrl", {
              type: "custom",
              message:
                "Only .jpg, .jpeg, .png, and .webp formats are supported.",
            });
            resolve();
          }
        });
      });
      await Promise.all(filePromises);
      setValue("imageUrl", imageUrls);
    }
  };
  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <Button className="self-center" variant={"blue"}>
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Product Details</DialogTitle>
          <DialogDescription>
            Please add all the details for the required product
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-y-4"
          onSubmit={handleSubmit(
            ({ name, category, price, description, imageUrl }) => {
              addProduct({
                name,
                category,
                description,
                imageUrl,
                price: Number(price),
              });
              isOpen(false);
              reset();
            },
          )}
        >
          <div className="grid grid-cols-4 items-center gap-x-2">
            <label
              htmlFor="name"
              className="text-right text-sm font-medium sm:text-base"
            >
              Name
            </label>
            <input
              type="text"
              className="col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none"
              {...register("name")}
            />
          </div>
          {errors.name?.message && (
            <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
              <p className="col-start-2 col-end-5 flex">
                <AlertCircle size={20} className="mr-1" />
                {errors.name?.message}
              </p>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-x-2">
            <label
              htmlFor="description"
              className="text-right text-sm font-medium sm:text-base"
            >
              Description
            </label>
            <textarea
              className="col-span-3 h-28 break-words rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none"
              {...register("description")}
            />
          </div>
          {errors.description?.message && (
            <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
              <p className="col-start-2 col-end-5 flex">
                <AlertCircle size={20} className="mr-1" />
                {errors.description?.message}
              </p>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-x-2">
            <label
              htmlFor="category"
              className="text-right text-sm font-medium sm:text-base"
            >
              Category
            </label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {productCategories.map((item) => {
                          return (
                            <SelectItem value={item} key={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </div>
          {errors.category?.message && (
            <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
              <p className="col-start-2 col-end-5 flex">
                <AlertCircle size={20} className="mr-1" />
                {errors.category?.message}
              </p>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-x-2">
            <label
              htmlFor="price"
              className="text-right text-sm font-medium sm:text-base"
            >
              Price
            </label>
            <input
              className="col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none"
              {...register("price")}
            />
          </div>
          {errors.price?.message && (
            <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
              <p className="col-start-2 col-end-5 flex">
                <AlertCircle size={20} className="mr-1" />
                {errors.price?.message}
              </p>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-x-2">
            <label
              htmlFor="imageUrl"
              className="text-right text-sm font-medium sm:text-base"
            >
              Upload Images
            </label>
            <input
              className="col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none"
              type="file"
              multiple
              onChange={handleFileChange}
              name="imageUrl"
            />
          </div>
          {errors.imageUrl?.message && (
            <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
              <p className="col-start-2 col-end-5 flex">
                <AlertCircle size={20} className="mr-1" />
                {errors.imageUrl?.message}
              </p>
            </div>
          )}
          <div className="flex space-x-2 justify-self-end">
            <Button
              className="w-28"
              variant={"gray"}
              type="button"
              onClick={() => {
                clearErrors();
                reset();
              }}
            >
              Reset
            </Button>
            <Button variant={"blue"} className="w-28" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddProduct;
