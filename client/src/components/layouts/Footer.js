import React from "react";
import HouseIcon from "@mui/icons-material/House";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const currentDate = new Date();
  const newDate = currentDate.getFullYear();
  const isAdminPage =
    window.location.pathname.startsWith("/admin") ||
    window.location.pathname.startsWith("/dashboard");
  if (isAdminPage) {
    return null;
  }
  return (
    <footer
      className={`${isAdminPage ? "hidden" : "block"} bg-black text-white z-40`}
    >
      <div className="container mx-auto py-10 px-4 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 flex flex-col gap-4" id="about">
            <p className="font-bold">ABOUT SHOP</p>
            <hr className="opacity-20" />
            <p className="text-white text-sm opacity-30 leading-relaxed">
              At D'Magni, we believe that fashion is an expression of
              individuality. Discover new pieces that perfectly match your
              personal style and empower you to stay ahead of the fashion curve.
              With our diverse range of high-quality products, you'll find
              everything you need to create a wardrobe that exudes confidence
              and elegance.
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <p className="font-bold">INFORMATION</p>
            <hr className="opacity-20" />
            <ul className="text-white text-sm flex flex-col gap-2">
              <Link to="/services">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Our Services
                </li>
              </Link>
              <Link to="/deliveryinfo">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Delivery Information
                </li>
              </Link>
              <Link to="/aboutus">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  About Us
                </li>
              </Link>
              <Link to="/termscon">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Terms and Conditions
                </li>
              </Link>
              <Link to="/privacy">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Privacy Policy
                </li>
              </Link>
              <Link to="/contact">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <p className="font-bold">LINKS</p>
            <hr className="opacity-20" />
            <ul className="text-white text-sm flex flex-col gap-2">
              {user ? (
                <div className=" flex flex-col gap-2">
                  <Link to="/me">
                    <li className="opacity-30 hover:opacity-100 cursor-pointer">
                      My Account
                    </li>
                  </Link>
                  <Link to="/orders/me">
                    <li className="opacity-30 hover:opacity-100 cursor-pointer">
                    Order History                    </li>
                  </Link>
                </div>
              ) : (
                <div className=" flex flex-col gap-2">
                  <Link to="/me">
                    <li className="opacity-30 hover:opacity-100 cursor-pointer">
                    Sign Up
                    </li>
                  </Link>
                  <Link to="/orders/me">
                    <li className="opacity-30 hover:opacity-100 cursor-pointer">
                     Login
                    </li>
                  </Link>
                </div>
              )}

              <Link to="/help">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Help
                </li>
              </Link>
              <Link to="/shop">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Shop
                </li>
              </Link>
              <Link to="/cart">
                <li className="opacity-30 hover:opacity-100 cursor-pointer">
                  Cart
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <p className="font-bold">GET IN TOUCH</p>
            <hr className="opacity-20" />
            <div className="opacity-30 text-sm flex flex-col gap-2">
              <span>
                {" "}
                <HouseIcon /> Lagos, Nigeria.
              </span>
              <p>
                {" "}
                <CallIcon /> +234 811 592 5346
              </p>
              <p>
                {" "}
                <EmailIcon /> info@dmagni.com
              </p>
            </div>
            <p className="font-bold">FIND US ON</p>
            <div className="flex gap-2 text-sm text-white">
              <a
                href="https://www.facebook.com/profile.php?id=100090802616846&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="cursor-pointer opacity-30 hover:opacity-100" />
              </a>
              <a
                href="https://instagram.com/anntoefashion?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="cursor-pointer opacity-30 hover:opacity-100" />
              </a>
              <a
                href="https://twitter.com/dmagnistores"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="cursor-pointer opacity-30 hover:opacity-100" />
              </a>
              <a
                href="https://www.linkedin.com/company/d-magni/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="cursor-pointer opacity-30 hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-white opacity-50 text-center text-sm mt-10">
          <p className="text-small">
            &copy; {newDate} D'Magni. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
