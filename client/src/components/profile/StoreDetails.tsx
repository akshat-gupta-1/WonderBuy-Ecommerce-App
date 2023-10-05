import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChangeEvent, useEffect, Suspense } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import useStoreId from "./hooks/useStoreId";
import { useParams } from "react-router-dom";
import Spinner from "@/shared/Spinner";
import { useNavigate } from "react-router-dom";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addStoreValidator = z.object({
  name: z.string().trim().max(30, "Name should be atmost 30 characters long"),
  description: z
    .string()
    .trim()
    .min(30, "Description should be atleast 10 characters long")
    .max(500, "Description cannot be this long"),
  location: z.object({
    address: z.string().trim().max(50, "Address is too long"),
    city: z.string().trim().min(1, "City Name is required").max(20),
    state: z.string().trim().min(1, "State Name is required").max(20),
    postalCode: z
      .string()
      .regex(/^\d+$/, "Invalid input")
      .min(6, "Postal Code has to minimum 6 characters long")
      .max(8, "Postal Code is too long"),
    country: z.string().trim().min(1, "Country Name is required").max(20),
  }),
  logo: z.string(),
});

type addStoreType = z.infer<typeof addStoreValidator>;
const StoreDetails = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { getStore, updateStore, deleteStore } = useStoreId(storeId);
  const { data: store } = getStore;
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
  useEffect(() => {
    reset(store);
  }, [reset, store]);
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
    <Suspense fallback={<Spinner />}>
      <Card className="mb-6 mt-4 w-[320px] sm:w-[550px] md:w-[480px] lg:w-[650px] xl:w-[750px]">
        <CardContent>
          <h2 className="pb-1 pt-4 text-xl font-semibold">Update Your Store</h2>
          <h4 className="pb-6 text-sm text-slate-9">Update Store Details</h4>
          <form
            className="grid gap-y-4"
            onSubmit={handleSubmit((data) => {
              updateStore(data);
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
              <div className="col-span-3 grid grid-cols-3 space-y-1">
                <label
                  htmlFor="addressline"
                  className="text-xs text-slate-9 sm:text-sm "
                >
                  Address
                </label>
                <input
                  type="text"
                  className={cn(
                    "col-span-3 w-full rounded-md border border-slate-7 px-2 py-1 focus:border-slate-8 focus:outline-none",
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
                Change Logo
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
                Update
              </Button>
            </div>
          </form>
          <div className="border-b border-slate-7 pt-4" />
          <h2 className="pb-1 pt-4 text-xl font-semibold">Delete Your Store</h2>
          <h4 className="pb-4 text-base text-slate-12">
            Do you want to delete your store?
          </h4>
          <Button
            variant={"destructive"}
            className="mb-1"
            onClick={() => {
              deleteStore.mutate();
              navigate(-1);
            }}
          >
            Delete Store
          </Button>
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default StoreDetails;
