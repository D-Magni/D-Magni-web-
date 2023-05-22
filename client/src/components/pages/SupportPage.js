import React, { useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";

const SupportPage = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [orderCancellationReason, setOrderCancellationReason] = useState("");
  const [helpRequest, setHelpRequest] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  const handleChatToggle = () => {
    setChatOpen(!isChatOpen);
  };

  const handleOrderCancellation = (e) => {
    e.preventDefault();
    console.log("Order Cancellation Requested:", orderCancellationReason);
    setOrderCancellationReason("");
  };

  const handleHelpRequest = (e) => {
    e.preventDefault();
    console.log("Help Requested:", helpRequest);
    setHelpRequest("");
  };

  return (
    <div className="py-40 px-5 md:px-24">
      <MetaData title={"Support"} />
      <h1 className="text-4xl font-bold mb-6">Support</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">
          Here you can find answers to common questions and inquiries.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Q: How can I place an order?</h3>
          <p className="text-gray-600">
            A: To place an order, simply browse our collection, select the desired item, choose the size and quantity, and click on the "Add to Cart" button. Then proceed to the checkout page to provide your shipping and payment details.
          </p>

          <h3 className="text-xl font-bold">Q: What payment methods do you accept?</h3>
          <p className="text-gray-600">
            A: We accept major credit cards, including Visa, Mastercard, and American Express. We also offer payment through PayPal for added convenience.
          </p>

          <h3 className="text-xl font-bold">Q: How long does shipping take?</h3>
          <p className="text-gray-600">
            A: Shipping times may vary depending on your location. Typically, orders are processed within 1-2 business days, and delivery can take anywhere from 3-7 business days. Please note that international orders may take longer to arrive.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Cancellation</h2>
        <p className="text-gray-600">
          If you need to cancel your order, please provide a reason below and submit the cancellation request.
        </p>
        <form onSubmit={handleOrderCancellation} className="space-y-4">
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="4"
            placeholder="Reason for order cancellation"
            value={orderCancellationReason}
            onChange={(e) => setOrderCancellationReason(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit Cancellation Request
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Help and Assistance</h2>
        <p className="text-gray-600">
          If you need any help or have specific questions, please fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleHelpRequest} className="space-y-4">
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="4"
            placeholder="Type your request here"
            value={helpRequest}
            onChange={(e) => setHelpRequest(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit Help Request
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleChatToggle}
        >
          {isChatOpen ? "Close Chat" : "Open Chat"}
        </button>
        {isChatOpen && (
          <div className="mt-4">
            {/* Live chat component or implementation */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
