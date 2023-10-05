import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
const AuthNav = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky inset-x-0 top-0 z-30 border-slate-6 border-b backdrop-blur-md bg-blue-1 shadow-sm shadow-slate-4">
      <div className="mx-auto lg:px-20 md:px-10 max-w-screen-xl px-6">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-semibold col-span-2 justify-self-start">
            <span className="text-slate-12">Wonder</span>
            <span className="text-blue-11">Buy</span>
          </Link>
          <div>
            <Button variant={'blue'} onClick={() => navigate(-1)}>
              {' '}
              <ArrowLeft size={20} />
              <span className="pl-2">Back</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
