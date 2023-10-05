import { Card, CardContent } from "../ui/card";
import useUser from "../user/hooks/useUser";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAccount from "./hooks/useAccount";
import useAuth from "../auth/hooks/useAuth";

const passwordValidator = z.object({
  currPassword: z
    .string()
    .min(8, "Password should be atleast 8 characters long")
    .max(20, "Password should be atmost 20 characters long"),
  newPassword: z
    .string()
    .min(8, "Password should be atleast 8 characters long")
    .max(20, "Password should be atmost 20 characters long"),
});

type validatorType = z.infer<typeof passwordValidator>;

const Account = () => {
  const { user } = useUser();
  const { LogoutHandler } = useAuth();
  const { changePassword, deleteAccount } = useAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<validatorType>({
    resolver: zodResolver(passwordValidator),
  });
  const [change, setChange] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [visibility1, setVisibility1] = useState<boolean>(false);
  return (
    <div className="px-8 pt-8">
      <h2 className="text-3xl font-bold text-slate-12">Account</h2>
      <h4 className="py-1 font-medium text-slate-9">
        Manage your Account settings
      </h4>
      <Card className="mt-4 w-[320px] sm:w-[550px] md:w-[480px] lg:w-[650px] xl:w-[750px]">
        <CardContent className="pt-4">
          <h4 className="border-b  border-slate-7 font-semibold text-slate-12">
            Profile
          </h4>
          <div className="py-5">
            <h3 className="text-lg font-bold">{user?.userName}</h3>
            <h3 className="font-medium">{user?.email}</h3>
          </div>
          <h4 className="border-b border-slate-7 font-semibold text-slate-12">
            Password
          </h4>
          {change ? (
            <div className="py-4">
              <h3 className=" mb-2">
                Change your password here.After saving, you'll logged out.
              </h3>
              <form
                className="space-y-3"
                onSubmit={handleSubmit((data) => {
                  changePassword(data);
                  reset();
                  LogoutHandler.refetch();
                })}
              >
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-9"
                  >
                    Current Password
                  </label>
                  <div className="flex w-full justify-between rounded-md border border-slate-6 pr-2 sm:w-[400px]">
                    <input
                      type={visibility ? "text" : "password"}
                      placeholder="********"
                      {...register("currPassword")}
                      className="w-full bg-whiteA-1 p-2 text-sm placeholder:text-slate-10 focus:outline-none"
                    />
                    <button
                      tabIndex={-1}
                      type="button"
                      className="text-sm text-slate-10"
                      onClick={(e) => {
                        e.preventDefault();
                        setVisibility(!visibility);
                      }}
                    >
                      {visibility ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currPassword?.message && (
                    <p className="mt-2 flex space-x-2 text-sm text-red-10">
                      <AlertCircle size={20} />
                      <span>{errors.currPassword?.message}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-9"
                  >
                    New Password
                  </label>
                  <div className="flex w-full justify-between rounded-md border border-slate-6 pr-2 sm:w-[400px]">
                    <input
                      type={visibility1 ? "text" : "password"}
                      placeholder="********"
                      {...register("newPassword")}
                      className="w-full bg-whiteA-1 p-2 text-sm placeholder:text-slate-10 focus:outline-none"
                    />
                    <button
                      tabIndex={-1}
                      type="button"
                      className="text-sm text-slate-10"
                      onClick={(e) => {
                        e.preventDefault();
                        setVisibility1(!visibility1);
                      }}
                    >
                      {visibility1 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword?.message && (
                    <p className="mt-2 flex space-x-2 text-sm text-red-10">
                      <AlertCircle size={20} />
                      <span>{errors.newPassword?.message}</span>
                    </p>
                  )}
                </div>
                <Button variant={"blue"} type="submit">
                  Save Password
                </Button>
              </form>
            </div>
          ) : (
            <div className="py-4">
              <h3 className="">Do you want to change your password?</h3>
              <Button
                className="my-2"
                variant={"blue"}
                onClick={() => setChange(true)}
              >
                Change Password
              </Button>
            </div>
          )}
          <h4 className="border-b border-slate-7 font-semibold text-slate-12">
            Delete your account
          </h4>
          <div className="my-4 space-y-2">
            <h3>Do you want to delete your account?</h3>
            <Button
              variant={"destructive"}
              onClick={() => {
                deleteAccount();
                LogoutHandler.refetch();
              }}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
