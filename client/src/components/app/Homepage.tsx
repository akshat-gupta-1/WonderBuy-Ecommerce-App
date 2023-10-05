import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../ui/button";
const images = ["Furniture", "Beauty", "Books", "Fashion", "Laptop"];
const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);
  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      goToNext();
    }, 5000);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [goToNext]);
  return (
    <div className="mx-auto h-[400px] max-w-screen-2xl px-6 md:h-auto md:px-10 lg:px-20">
      <div className="justify- grid h-full grid-cols-1 gap-4 md:grid-cols-[minmax(450px,_1fr)_minmax(150px,_1fr)]">
        <div className="hidden md:block">
          <div className=" mx-auto max-w-full overflow-hidden">
            <div
              className="whitespace-nowrap transition-transform duration-1000 ease-in"
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              {images.map((item, index) => {
                return (
                  <img
                    src={`/assets/imgs/${item}Banner.png`}
                    className=" inline-block max-h-[500px] max-w-full object-contain"
                    key={index}
                  />
                );
              })}
            </div>
            <div className="text-center">
              {images.map((_, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "mx-2 mt-5 inline-block h-3 w-3 cursor-pointer rounded-full bg-slate-7",
                      {
                        "bg-slate-10": index === currentIndex,
                      },
                    )}
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center place-self-center px-4 md:place-self-auto ">
          <p className="text-center text-[40px] font-bold text-slate-12 md:text-left md:text-[27px] lg:text-[35px] xl:text-[40px]">
            Discover Your <br />{" "}
            <span className="text-blue-11">Shopping Experience</span>
          </p>
          <p className="text-center font-medium text-slate-11 md:text-left">
            Shop Now for Unbeatable Deals!
          </p>
          <div className="flex justify-center space-x-4 md:justify-normal md:space-x-0">
            <Button className=" mt-6 h-14 w-36 bg-blue-12 hover:scale-105 hover:bg-blue-11 md:h-12 md:w-28">
              Shop Now
            </Button>
            <Button
              className="mt-6 block h-14 w-36 bg-slate-6 text-slate-12 hover:scale-105 hover:bg-slate-7 md:hidden
            "
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
