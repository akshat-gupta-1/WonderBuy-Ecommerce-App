import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import useAuth from './hooks/useAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '../ui/card';
import { useState } from 'react';

const signinValidator = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password should be atleast 8 characters long' })
    .max(20, { message: 'Password should be atmost 20 characters long' }),
});

type SigninCredentials = z.infer<typeof signinValidator>;

const Signin = () => {
  const { auth } = useAuth();
  const [visibility, setVisibility] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninCredentials>({
    resolver: zodResolver(signinValidator),
  });

  return (
    <div className="mx-auto max-w-screen-xl">
      <Card className="sm:w-[550px] w-[320px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-y-3">
            <Button variant={'fullWidth'} className="my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                //@ts-ignore
                className="bi bi-google mr-2"
                viewBox="0 0 16 16"
              >
                {' '}
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{' '}
              </svg>
              Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0">
                <div className="border-b border-slate-6"></div>
                <div className="relative flex justify-center text-xs -top-2 ">
                  <span className="uppercase bg-slate-1 px-2 text-slate-10">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            <form
              className="grid gap-y-4"
              onSubmit={handleSubmit((data) => {
                auth({ url: '/api/auth/login', ...data });
                reset();
              })}
            >
              <div className="grid gap-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-12"
                >
                  Email
                </label>
                <input
                  placeholder="email@example.com"
                  {...register('email')}
                  className="bg-whiteA-1 border border-slate-6 rounded-md text-sm p-2 focus:outline-none placeholder:text-slate-10"
                />
                {errors.email?.message && (
                  <p className="text-sm mt-2 text-red-10 flex space-x-2">
                    <AlertCircle size={20} />
                    <span>{errors.email?.message}</span>
                  </p>
                )}
              </div>
              <div className="grid gap-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-12"
                >
                  Password
                </label>
                <div className="w-full border border-slate-6 rounded-md flex justify-between pr-2">
                  <input
                    type={visibility ? 'text' : 'password'}
                    placeholder="********"
                    {...register('password')}
                    className="bg-whiteA-1 text-sm p-2 focus:outline-none placeholder:text-slate-10 w-full"
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
                {errors.password?.message && (
                  <p className="text-sm mt-2 text-red-10 flex space-x-2">
                    <AlertCircle size={20} />
                    <span>{errors.password?.message}</span>
                  </p>
                )}
                <Button variant={'blue'} className="mt-4 w-full" type="submit">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-slate-10">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-blue-11">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
