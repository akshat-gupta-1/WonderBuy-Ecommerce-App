const ChooseUsBanner = () => {
  return (
    <div className="mt-12 flex flex-col items-center">
      <h4 className="text-2xl font-bold uppercase underline decoration-blue-11 decoration-wavy underline-offset-8">
        Why choose us?
      </h4>
      <div className="grid grid-cols-1 gap-y-4 py-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center space-y-4">
          <img src="globe.svg" alt="" />
          <h5 className="font-semibold uppercase">Global Delivery</h5>
          <p className="px-4 text-center text-sm text-slate-10">
            Experience Hassle-Free Shipping and Seamless Global Connectivity
            with Our Trustworthy and Efficient Delivery Service, Bringing the
            World to Your Fingertips!
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="box.svg" alt="" />
          <h5 className="font-semibold uppercase">Free Shipping</h5>
          <p className="px-4 text-center text-sm text-slate-10">
            Shop to Your Heart's Content Without Worrying About Shipping Costs:
            Our Free Shipping Service Delivers Your Purchases with a Smile,
            Straight to Your Doorstep!
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="phone.svg" alt="" />
          <h5 className="font-semibold uppercase">24/7 Support</h5>
          <p className="px-4 text-center text-sm text-slate-10">
            Shop with Confidence Anytime, Anywhere: Our Free Shipping Service
            Comes with 24/7 Support to Ensure Your Packages Arrive Safely and On
            Time!
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="email.svg" alt="" />
          <h5 className="font-semibold uppercase">Daily Email</h5>
          <p className="px-4 text-center text-sm text-slate-10">
            Stay Up-to-Date with Your Deliveries: Enjoy the Convenience of Daily
            Email Updates with Our Free Shipping Service, Making Your Online
            Shopping Experience Even More Enjoyable!
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="creditcard.svg" alt="" />
          <h5 className="font-semibold uppercase">Easy Payment</h5>
          <p className="px-4 text-center text-sm text-slate-10">
            Shop and Pay with Ease: Our Free Shipping Service Not Only Delivers
            Your Packages for Free, but Also Offers Easy Payment Options, Making
            Your Shopping Experience a Breeze!
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="voucher.svg" alt="" />
          <h5 className="font-semibold uppercase">Monthly Voucher</h5>
          <p className="px-4 text-center text-sm text-slate-10">
            More Than Just Free Shipping: Our Service Rewards Your Loyalty with
            Monthly Vouchers, Giving You More Reasons to Shop and Save on Your
            Favorite Products!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUsBanner;
