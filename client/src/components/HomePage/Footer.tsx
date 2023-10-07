import { Card } from "../ui/card";
import { Twitter, Facebook, Linkedin, Copyright } from "lucide-react";
const Company = [
  "About Us",
  "Blog",
  "Careers",
  "Our Team",
  "Help Center",
  "Outlets",
];
const Shop = [
  "Gift Cards",
  "Our Products",
  "My Account",
  "Shipping",
  "Returns",
  "Rewards",
];
const Support = [
  "Contact Us",
  "Payment Options",
  "Store Locator",
  "Accessibilty",
  "Affiliates",
];
const FAQ = ["Rewards FAQ", "Product Care", "Size Guide"];
const Footer = () => {
  return (
    <div className="w-full bg-slate-2 sm:h-[800px] md:h-[600px] lg:h-[400px]">
      <div className="mx-auto mt-16 max-w-screen-2xl border-b border-slate-7 px-6 py-16 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-[minmax(300px,_400px)_1fr]">
          <div className="flex flex-col space-y-2">
            <p className="text-xl font-bold">
              Wonder<span className="text-blue-11">Buy</span>
            </p>
            <p className="max-w-[270px] text-sm text-slate-10">
              Join out list and get 10% off your next purchase
            </p>
            <div className="pt-4">
              <h5 className="font-medium">Accepted Payments</h5>
              <div className="flex space-x-1 pt-3">
                <Card className="flex items-center">
                  <img
                    src="/assets/imgs/stripe.png"
                    alt=""
                    className="object-contain p-2"
                  />
                </Card>
                <Card className="flex items-center">
                  <img
                    src="/assets/imgs/mastercard.png"
                    alt=""
                    className="object-contain p-2"
                  />
                </Card>
                <Card className="flex items-center">
                  <img
                    src="/assets/imgs/visa.png"
                    alt=""
                    className="object-contain p-2"
                  />
                </Card>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
            <div className="">
              <h5 className="pb-3 font-medium">Company</h5>
              <ul className="flex flex-col space-y-2">
                {Company.map((item) => (
                  <li className="cursor-pointer text-sm text-slate-9 hover:text-slate-12">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h5 className="pb-3 font-medium">Shop</h5>
              <ul className="flex flex-col space-y-2">
                {Shop.map((item) => (
                  <li className="cursor-pointer text-sm text-slate-9 hover:text-slate-12">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h5 className="pb-3 font-medium">Support</h5>
              <ul className="flex flex-col space-y-2">
                {Support.map((item) => (
                  <li className="cursor-pointer text-sm text-slate-9 hover:text-slate-12">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h5 className="pb-3 font-medium">FAQ</h5>
              <ul className="flex flex-col space-y-2">
                {FAQ.map((item) => (
                  <li className="cursor-pointer text-sm text-slate-9 hover:text-slate-12">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-2xl px-6 pt-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-[minmax(100px,_400px)_1fr]">
          <div className="flex space-x-2">
            <h5 className="text-sm font-medium">Find us on:</h5>
            <Twitter className="cursor-pointer" size={22} />
            <Facebook className="cursor-pointer" size={22} />
            <Linkedin className="cursor-pointer" size={22} />
          </div>
          <div className="grid grid-cols-1 gap-y-2 md:grid-flow-row md:grid-cols-2 lg:grid-cols-3">
            <h5 className="cursor-pointer text-sm">Terms of Use</h5>
            <h5 className="cursor-pointer text-sm">Privacy Policy</h5>
            <div className="text-sm text-slate-9 md:col-span-2 lg:col-span-1">
              <p className="flex">
                <Copyright size={15} className="mt-0.5" />
                <span>2023 All rights reserved. Designed By Akshat</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
