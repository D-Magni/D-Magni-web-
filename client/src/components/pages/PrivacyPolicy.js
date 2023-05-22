import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <div>
      <MetaData title={"Privacy Policy"} />
      <div className="container mx-auto px-4 py-40">
        <h1 className="text-4xl font-bold mb-6 text-gray-700">Privacy Policy</h1>
        <p className="text-gray-600">
          This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website or use our services. By accessing or using our website, you consent to the collection, use, disclosure, and protection of your personal information as described in this Privacy Policy.
        </p>
        <p className="text-gray-600">
          <strong>1. Information We Collect</strong>
          <br />
          We may collect various types of personal information from you, including your name, email address, phone number, and any other information you provide to us voluntarily.
        </p>
        <p className="text-gray-600">
          <strong>2. How We Use Your Information</strong>
          <br />
          We may use your personal information to communicate with you, process your orders, provide customer support, and improve our services. We may also use your information for marketing purposes, such as sending you promotional emails or newsletters. You can opt-out of receiving marketing communications at any time.
        </p>
        <p className="text-gray-600">
          <strong>3. Information Sharing</strong>
          <br />
          We may share your personal information with third-party service providers who assist us in operating our website and providing our services. We may also share your information with law enforcement agencies or other third parties if required by law or to protect our rights or the rights of others.
        </p>
        <p className="text-gray-600">
          <strong>4. Data Security</strong>
          <br />
          We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        <p className="text-gray-600">
          <strong>5. Changes to Privacy Policy</strong>
          <br />
          We may update this Privacy Policy from time to time. Any changes we make will be posted on this page, and the revised Privacy Policy will be effective immediately upon posting.
        </p>
        <p className="text-gray-600">
          If you have any questions or concerns about our Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
