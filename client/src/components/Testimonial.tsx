import { testimonialsData } from "../assets/assets";

const Testimonial = () => {
  return (
    <div className="pb-20px md:py-20 mx-2">
      <h1 className="text-2xl  text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Customer Testimonials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((item, index) => (
          <div key={index} className="bg-white drop-shadow-md rounded-lg p-6 max-w-lg m-auto hover:scale-105 transition-all duration-700">
            <p className="text-4xl text-gray-500">”</p>
            <p className="text-sm text-gray-500">{item.text}</p>
            <div className="flex items-center gap-3 mt-5">
              <img src={item.image} alt="testimonial" className="rounded-full w-9 "/>
              <div>
                <p >{item.author}</p>
                <p className="text-sm text-gray-600">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
