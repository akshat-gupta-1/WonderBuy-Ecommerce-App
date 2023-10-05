import { Outlet } from 'react-router-dom';
import AuthNav from './AuthNav';
const AuthLayout = () => {
  return (
    <>
      <div className="w-screen h-screen bg-blue-1">
        <AuthNav />
        <div className="max-h-full max-w-full pt-24 grid place-items-center bg-blue-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
