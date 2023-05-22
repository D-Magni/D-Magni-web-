import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";

const Help = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <div className="container mx-auto px-4 py-40">
      <MetaData title={"Help"} />
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Help</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Frequently Asked Questions</h2>
        <p className="text-gray-600">
          Here are answers to some common questions:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>Q: How do I place an order?</li>
          <li>A: To place an order, simply browse our collection, select the desired product, and proceed to checkout.</li>
          <li>Q: What payment methods do you accept?</li>
          <li>A: We accept various payment methods, including credit cards, debit cards, and online payment platforms like PayPal.</li>
          <li>Q: Do you offer international shipping?</li>
          <li>A: Yes, we offer international shipping.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Contact Us</h2>
        <p className="text-gray-600">
          If you have any other questions or need further assistance, please feel free to reach out to our customer support team.
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>Email: info@dmagni.com</li>
          <li>Phone: +2348115925346</li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
