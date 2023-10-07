import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const CTA = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 h-[200px] w-full bg-blue-12 sm:h-[350px] ">
      <div className="mx-auto grid h-full max-w-screen-2xl grid-cols-1 content-center justify-items-center px-6 sm:grid-cols-2 md:px-10 lg:px-20 ">
        <div className="flex h-full flex-col justify-center space-y-4">
          <h4 className="leading relaxed text-center text-xl font-bold text-blue-5 sm:text-left sm:text-xl sm:leading-relaxed md:text-[22px] md:leading-relaxed lg:text-[28px] lg:leading-relaxed xl:text-[33px] xl:leading-relaxed">
            Revamp Your Style with 50% Off!
            <br /> Unleash the Fashionista in You Today!
          </h4>
          <div className="flex w-full justify-center sm:justify-normal">
            <Button
              className="w-32"
              variant={"blue"}
              onClick={() => navigate("/categories/fashion")}
            >
              Shop Now
            </Button>
          </div>
        </div>
        <img
          src="public/assets/imgs/pngegg(2).png"
          alt=""
          className="hidden max-h-[350px] max-w-[550px] object-center sm:block"
        />
      </div>
    </div>
  );
};

export default CTA;
