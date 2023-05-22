import React, {useEffect } from "react";
import MetaData from "../layouts/MetaData";

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <div>
      <MetaData title={"Our Services"} />
      <div className="container mx-auto px-4 py-40">
        <h1 className="text-4xl font-bold mb-6 text-gray-700">Our Services</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Shoe Customization</h2>
          <p className="text-gray-600">
            We offer shoe customization services, allowing you to personalize your footwear according to your preferences. From choosing the materials and colors to adding unique embellishments or monograms, our expert craftsmen can bring your vision to life. Whether it's for a special occasion or to showcase your individual style, our shoe customization service ensures you have a one-of-a-kind pair of shoes.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Footwear Accessories</h2>
          <p className="text-gray-600">
            In addition to shoes, we offer a selection of footwear accessories to complement your style and enhance your shoe-wearing experience. Our range of accessories includes shoe horns, shoe bags, insoles, and more. These accessories are designed to provide convenience, comfort, and added protection for your shoes, allowing you to fully enjoy your footwear collection.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Consultation and Styling</h2>
          <p className="text-gray-600">
            Our team of shoe experts is available for consultation and styling services. Whether you need assistance in selecting the perfect pair of shoes for a specific occasion or advice on how to style your shoes with different outfits, our experts can provide personalized recommendations and guidance. We understand the importance of finding the right footwear that matches your style and fits your needs, and we are here to help you make informed decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
