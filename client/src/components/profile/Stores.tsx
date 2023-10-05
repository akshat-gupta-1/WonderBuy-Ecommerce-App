import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useStores from "./hooks/useStore";
import Spinner from "@/shared/Spinner";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addStoreValidator = z.object({
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
  location: z.object({
    address: z
      .string()
      .trim()
      .min(1, "Address is required")
      .max(50, "Address is too long"),
    city: z.string().trim().min(1, "City Name is required").max(20),
    state: z.string().trim().min(1, "State Name is required").max(20),
    postalCode: z
      .string()
      .regex(/^\d+$/, "Invalid input")
      .min(6, "Postal Code has to minimum 6 characters long")
      .max(8, "Postal Code is too long"),
    country: z.string().trim().min(1, "Country Name is required").max(20),
  }),
  logo: z.string({ required_error: "Logo is required" }),
});

type addStoreType = z.infer<typeof addStoreValidator>;

const Stores = () => {
  const [open, isOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<addStoreType>({
    resolver: zodResolver(addStoreValidator),
    criteriaMode: "all",
  });
  const { createStore, getStores } = useStores();
  const { data, isFetching } = getStores;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      clearErrors("logo");
      if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setValue("logo", reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setError("logo", {
          type: "custom",
          message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
        });
      }
    }
  };
  return (
    <div className="px-8 pt-8">
      <div className="flex min-w-[320px] max-w-[800px] justify-between pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-12">Stores</h2>
          <h4 className="py-1 font-medium text-slate-9">Manage your stores</h4>
        </div>
        <Dialog open={open} onOpenChange={isOpen}>
          <DialogTrigger asChild>
            <Button className="w-28 self-center" variant={"blue"}>
              Add Store
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add Store Details</DialogTitle>
              <DialogDescription>
                Please add all the details for the required store
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-y-4"
              onSubmit={handleSubmit((data) => {
                createStore(data);
                isOpen(false);
                reset();
              })}
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
                  htmlFor="address"
                  className="text-right text-sm font-medium sm:text-base"
                >
                  Address
                </label>
                <div className="col-span-3 grid space-y-1">
                  <label
                    htmlFor="addressline"
                    className="text-xs text-slate-9 sm:text-sm "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none",
                      {
                        "border-red-10": errors.location?.address,
                      },
                    )}
                    {...register("location.address")}
                  />
                  <label
                    htmlFor="city"
                    className="text-xs text-slate-9 sm:text-sm "
                  >
                    City
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none",
                      {
                        "border-red-10": errors.location?.city,
                      },
                    )}
                    {...register("location.city")}
                  />
                  <label
                    htmlFor="state"
                    className="text-xs text-slate-9 sm:text-sm "
                  >
                    State
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none",
                      {
                        "border-red-10": errors.location?.state,
                      },
                    )}
                    {...register("location.state")}
                  />
                  <label
                    htmlFor="country"
                    className="text-xs text-slate-9 sm:text-sm "
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none",
                      {
                        "border-red-10": errors.location?.country,
                      },
                    )}
                    {...register("location.country")}
                  />
                  <label
                    htmlFor="pincode"
                    className="text-xs text-slate-9 sm:text-sm "
                  >
                    Pin Code
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none",
                      {
                        "border-red-10": errors.location?.postalCode,
                      },
                    )}
                    {...register("location.postalCode")}
                  />
                </div>
              </div>
              {(errors.location?.address ||
                errors.location?.city ||
                errors.location?.state ||
                errors.location?.country ||
                errors.location?.postalCode) && (
                <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
                  <p className="col-start-2 col-end-5 flex">
                    <AlertCircle size={20} className="mr-1" />
                    {`This field is required`}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-x-2">
                <label
                  htmlFor="UploadLogo"
                  className="text-right text-sm font-medium sm:text-base"
                >
                  Upload Logo
                </label>
                <input
                  onChange={handleFileChange}
                  name="logo"
                  type="file"
                  className="col-span-3 rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none "
                />
              </div>
              {errors.logo?.message && (
                <div className="-mt-1 grid grid-cols-4 text-sm text-red-10 ">
                  <p className="col-start-2 col-end-5 flex">
                    <AlertCircle size={20} className="mr-1" />
                    {errors.logo?.message}
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
      </div>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 justify-center justify-items-center gap-4 sm:grid-cols-2 sm:justify-normal sm:justify-items-stretch md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item) => {
            return (
              <Link to={`/profile/stores/${item._id}`} key={item._id}>
                <Card className="w-full cursor-pointer sm:max-w-[330px] md:max-w-[250px]">
                  <CardContent className=" flex flex-col items-center justify-center pt-4">
                    <img
                      src={item.logo}
                      alt=""
                      className="h-28 w-28 rounded-full border border-slate-8"
                    />
                    <p className="py-2 text-lg font-medium">{item.name}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Stores;
