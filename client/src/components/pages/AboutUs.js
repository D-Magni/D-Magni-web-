import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-40">
        <MetaData title={"About Us"}/>
      <h1 className="text-4xl font-bold mb-6 text-gray-700">About Us</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Company Overview</h2>
        <p className="text-gray-600">
          D'Magni is a luxury shoe brand that specializes in handcrafted,
          high-quality shoes for men. Our mission is to provide exquisite
          footwear that combines timeless elegance with exceptional comfort.
          With meticulous craftsmanship and a passion for perfection, we create
          shoes that exude luxury and elevate any ensemble.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Brand Story</h2>
        <p className="text-gray-600">
          D'Magni was founded on the belief that men deserve to experience the
          epitome of luxury in their footwear. Inspired by the allure of
          fine craftsmanship and a love for exceptional design, our brand has
          been shaping the world of luxury shoes since its inception. What
          began as a small workshop has now evolved into a renowned brand that
          epitomizes sophistication and style.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Craftsmanship and Quality</h2>
        <p className="text-gray-600">
          At D'Magni, we are dedicated to preserving the art of traditional
          shoemaking. Each pair of shoes is meticulously crafted by our skilled
          artisans, who bring decades of expertise to every stitch and detail.
          We source only the finest materials, ensuring exceptional quality and
          durability. Our commitment to craftsmanship guarantees that every
          pair of D'Magni shoes is a testament to exquisite artistry.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Product Range</h2>
        <p className="text-gray-600">
          Our collection features a diverse range of luxury shoes that caters
          to the modern gentleman. From timeless classics to contemporary
          designs, we offer a variety of styles to suit every occasion. Whether
          you're attending a formal event or seeking everyday elegance, D'Magni
          has the perfect pair to elevate your style and make a statement.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Customer Satisfaction</h2>
        <p className="text-gray-600">
          At D'Magni, customer satisfaction is at the heart of everything we
          do. We strive to provide an exceptional shopping experience, ensuring
          that our customers receive personalized attention and unparalleled
          service. From easy returns to prompt assistance, we go the extra mile
          to ensure that every customer is delighted with their D'Magni
          purchase.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Social Responsibility</h2>
        <p className="text-gray-600">
          We are committed to ethical and sustainable practices. We carefully
          source our materials to minimize environmental impact and support
          responsible production methods. Additionally, we actively contribute
          to local communities and charitable organizations, striving to make a
          positive difference beyond the world of luxury footwear.
        </p>
      </div>

      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          Add testimonials or reviews here
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          Add team member profiles here
        </div>
      </div> */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Contact Information</h2>
        <p className="text-gray-600">
          For any inquiries or assistance, please feel free to reach out to us.
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>Email: info@dmagni.com</li>
          <li>Phone: +2348115925346</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
