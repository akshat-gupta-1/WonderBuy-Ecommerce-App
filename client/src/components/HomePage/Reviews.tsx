import { Card, CardContent } from "../ui/card";
import { Quote } from "lucide-react";
const Reviews = () => {
  return (
    <div className="mx-auto mt-16 max-w-screen-2xl  px-6 md:px-10 lg:px-20">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h4 className="text-2xl font-bold uppercase underline decoration-blue-11 decoration-wavy underline-offset-8">
          Reveiws By People
        </h4>
        <p className="max-w-[650px] text-center text-sm text-slate-10">
          Discover the positive impact we've made on the our clients by reading
          through their testimonials. Our clients have experienced our service
          and results, and they're eager to share their positive experiences
          with you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2">
        <Card className="max-w-[600px] justify-self-center border-blue-11 shadow-md shadow-blue-4 md:justify-self-end">
          <CardContent>
            <div className="flex flex-col space-y-4 p-4">
              <p className="text-lg font-medium ">
                "Fantastic one-stop shop for all my needs! Impressive range of
                electronics, stylish furniture, captivating books, trendy
                fashion, and top-notch beauty products. Easy navigation and
                swift delivery. Highly recommended!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="/assets/imgs/HarryPotter.webp"
                    alt=""
                    className="h-[90px] w-[90px] rounded-full object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Harry Putter</p>
                    <p className="text-sm font-medium text-slate-9">Noida,UP</p>
                  </div>
                </div>
                <Quote size={50} className="hidden text-blue-11 sm:block" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-[600px] justify-self-center border-blue-11 shadow-md shadow-blue-4 md:justify-self-start">
          <CardContent>
            <div className="flex flex-col space-y-4 p-4">
              <p className="text-lg font-medium ">
                "Exceptional product quality across electronics, furniture,
                books, fashion, and beauty categories. Each item surpasses
                expectations, ensuring satisfaction with every purchase. A
                top-tier shopping destination."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="/assets/imgs/RonWezzly.jpg"
                    alt=""
                    className="h-[90px] w-[90px] rounded-full object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Ron Qureshi</p>
                    <p className="text-sm font-medium text-slate-9">
                      Gurgoan,HR
                    </p>
                  </div>
                </div>
                <Quote size={50} className="hidden text-blue-11 sm:block" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reviews;
