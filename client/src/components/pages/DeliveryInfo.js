import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";

const DeliveryInfo = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <div className="container mx-auto px-4 py-40">
      <MetaData title={"Delivery Information"} />
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Delivery Information</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Shipping Policy</h2>
        <p className="text-gray-600">
          We offer nationwide shipping within Nigeria for all our products. Here are the details of our shipping policy:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>Delivery time may vary depending on the location. Typically, orders are delivered within 3-5 business days.</li>
          <li>Once your order is shipped, you will receive a confirmation email with tracking information.</li>
          <li>In case of any delays or issues with the delivery, our customer support team will assist you promptly.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Returns and Exchanges</h2>
        <p className="text-gray-600">
          We want you to be completely satisfied with your purchase. If you are not satisfied for any reason, we offer easy returns and exchanges:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>If you wish to return or exchange a product, please contact our customer support within 7 days of receiving your order.</li>
          <li>The product must be unused, in its original condition, and with all the tags and packaging intact.</li>
          <li>We will provide a return shipping label for eligible returns/exchanges.</li>
          <li>Refunds will be processed within 5-7 business days after we receive the returned product.</li>
          <li>Please note that certain products, such as personalized/customized items, may not be eligible for return or exchange.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Contact Information</h2>
        <p className="text-gray-600">
          If you have any questions or need further assistance regarding delivery, returns, or exchanges, please reach out to our customer support team.
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>Email: info@dmagni.com</li>
          <li>Phone: +2348115925346</li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryInfo;
