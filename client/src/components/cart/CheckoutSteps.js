import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className=" flex justify-center gap-10 mt-5 pt-36 pb-10 ">
      {shipping ? (
        <Link to="/shipping" className="float-right">
          <div className="active"></div>
          <div className="step active-step border-2 w-[50px] h-[50px] rounded-full bg-amber-400  text-white grid place-items-center">1</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step active-incomplete border-2 w-[50px] h-[50px] rounded-full bg-gray-400 ">1</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/order/confirm" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step border-2 w-[50px] h-[50px] rounded-full bg-amber-600  text-white grid place-items-center">2</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step active-incomplete border-2 w-[50px] h-[50px] rounded-full bg-gray-400 text-white grid place-items-center">2</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">3</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step active-incomplete border-2 w-[50px] h-[50px] rounded-full bg-gray-400 text-white grid place-items-center">3</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
