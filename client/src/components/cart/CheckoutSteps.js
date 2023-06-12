import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CheckoutSteps = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center gap-10 mt-5 pt-36 pb-10">
      <div className={`step border-2 w-[50px] h-[50px] rounded-full  text-white grid align-items-center text-center ${
        location.pathname === "/shipping" ? "bg-amber-400 text-white" :
        location.pathname === "/order/confirm" ? "bg-green-500 text-white" :
        "bg-gray-400"
      }`}>
        {location.pathname === "/shipping" ? (
          <>
            <div className="triangle-inactive"></div>
            <div className="triangle-active"></div>
          </>
        ) : (
          <>
            <div className="triangle-incomplete"></div>
            <div className="triangle2-incomplete"></div>
          </>
        )}
        1
      </div>

      <div className={`step border-2 w-[50px] h-[50px] rounded-full  text-white grid align-items-center text-center ${
        location.pathname === "/order/confirm" ? "bg-amber-400 text-white" :
        location.pathname === "/payment" ? "bg-green-500 text-white" :
        "bg-gray-400"
      }`}>
        {location.pathname === "/order/confirm" ? (
          <>
            <div className="triangle-inactive"></div>
            <div className="triangle-active"></div>
          </>
        ) : (
          <>
            <div className="triangle-incomplete"></div>
            <div className="triangle2-incomplete"></div>
          </>
        )}
        2
      </div>

      <div className={`step border-2 w-[50px] h-[50px] rounded-full  text-white grid align-items-center text-center ${
        location.pathname === "/payment" ? "bg-green-500 text-white" :
        "bg-gray-400"
      }`}>
        {location.pathname === "/payment" ? (
          <>
            <div className="triangle-inactive"></div>
            <div className="triangle-active"></div>
          </>
        ) : (
          <>
            <div className="triangle-incomplete"></div>
            <div className="triangle2-incomplete"></div>
          </>
        )}
        3
      </div>
    </div>
  );
};

export default CheckoutSteps;
