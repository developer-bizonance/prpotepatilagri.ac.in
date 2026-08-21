import Navigationbar from "./navigation.jsx";

export default function Header() {
  return (
    <>
      <div className="bg-gray-100 text-white  shadow-lg">
        <div className="container mx-auto px-4 py-1 flex flex-wrap items-center justify-center">
          {/* Left Side - Logo + Text */}
          <div className="flex w-[1400px] items-center justify-between">
            {/* Left Logo */}
            <div className="flex gap-2 sm:gap-6 items-center ">
              <img
                src="/assets/agriculture.png"
                alt="Lakshya Academy Logo"
                className="h-22 sm:h-20 md:h-38 object-contain"
              />

              {/* Orange Line */}
              <div className="bg-orange-400 w-1 h-25 sm:h-12 md:h-34"></div>


              {/* Text Content */}
              <div className="text-left h-22 sm:h-auto flex flex-col justify-center">
                <h1
                  style={{ fontFamily: "RockwellBold, serif" }}
                  className="text-orange-500 text-xl sm:text-3xl md:text-4xl font-medium leading-tight sm:leading-normal"
                >
                  P. R. Pote Patil
                </h1>

                <h2 className="text-black text-sm sm:text-base md:text-2xl font-bold leading-snug sm:leading-normal">
                  College of Agriculture, Amravati.

                  <span className="block text-black font-light text-[9px] sm:text-sm leading-snug sm:leading-normal mt-1">
                   Recognized By MCAER,Pune & Aff. to PDKV,</span>

                  <span className="block text-black font-light text-[9px] sm:text-sm leading-snug sm:leading-normal mt-1">
                     
                  </span>

                  <span className="block text-black font-light text-[9px] sm:text-sm leading-snug sm:leading-normal mt-1">
                   Akola College Code - 11302
                  </span>
                </h2>

              </div>

            </div>

            {/* Right Logo - Only visible on sm and up */}
            <div className="hidden sm:block">
              <img
                src="/assets/trust.png"
                alt="Trust Logo"
                className="h-12 sm:h-14 md:h-36 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar Below Header */}
      <Navigationbar />
    </>
  );
}
