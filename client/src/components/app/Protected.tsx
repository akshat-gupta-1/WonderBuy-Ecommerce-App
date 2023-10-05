import { Navigate } from "react-router-dom";
interface protectedProps {
  token: string|null;
  children: React.ReactNode;
}
const Protected = ({ token, children }: protectedProps) => {
  if (!token) {
    return <Navigate to={"/auth/signin"} replace />;
  }
  return children;
};

export default Protected;
