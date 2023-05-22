import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";

const TermsCon = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <div>
      <MetaData title={"Terms and Conditions"} />
      <div className="container mx-auto px-4 py-40">
        <h1 className="text-4xl font-bold mb-6 text-gray-700">Terms and Conditions</h1>
        <p className="mb-8 text-gray-600">
          Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Website Usage</h2>
        <p className="mb-8 text-gray-600">
          The content of the pages of this website is for your general information and use only. It is subject to change without notice.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Intellectual Property</h2>
        <p className="mb-8 text-gray-600">
          This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">User Conduct</h2>
        <p className="mb-8 text-gray-600">
          Your use of this website and any dispute arising out of such use of the website is subject to the laws of the jurisdiction in which you reside.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Limitation of Liability</h2>
        <p className="mb-8 text-gray-600">
          In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
   
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Changes to the Terms and Conditions</h2>
        <p className="mb-8 text-gray-600">
          We reserve the right to modify or replace these terms and conditions at any time. Any changes will be effective immediately upon posting the updated terms and conditions on the website. Your continued use of the website after any such changes constitutes your acceptance of the new terms and conditions.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Contact Us</h2>
        <p className="mb-8 text-gray-600">
          If you have any questions or concerns about these terms and conditions, please contact us.
        </p>
      </div>
    </div>
  );
};

export default TermsCon;
