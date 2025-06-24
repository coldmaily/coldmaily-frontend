"use client";
import { motion } from "framer-motion";

const useCases = [
  {
    title: "Sales Teams & B2B Companies",
    description: "Convert leads into customers effortlessly with AI-driven follow-ups and smart outreach.",
    image: "/cold-image-vector.png",
  },
  {
    title: "Job Seekers & Professionals",
    description: "Ensure recruiters notice your applications with automated, personalized follow-ups.",
    image: "/cold-image-vector.png",
  },
  {
    title: "Marketing Agencies & Service Providers",
    description: "Scale your outreach, nurture leads, and boost conversions with AI-driven cold emails.",
    image: "/cold-image-vector.png",
  },
  {
    title: "Startup Founders & Entrepreneurs",
    description: "Get investors, partners, and clients to notice you with AI-optimized cold emails.",
    image: "/cold-image-vector.png",
  },
];

const ScrollUseCases = () => {
  return (
    <section className="w-full py-20 bg-gray-100 flex flex-col items-center">
      {/* Main Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Empower Your Growth with Smarter Cold Outreach
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700">
          Discover How ColdMaily Makes It Easy
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
        {useCases.map((useCase, index) => (
          <motion.div
              key={index}
              className="w-64 bg-white rounded-xl overflow-hidden flex flex-col items-center p-6 cursor-pointer border border-transparent"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.3 }}// Entrance = SMOOTH 0.6s
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                borderColor: "#3B82F6",
                transition: { duration: 0.1 }, // Hover = FAST 0.15s
              }}
             >
              <img
                src={useCase.image}
                alt={useCase.title}
                className="w-24 h-24 object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {useCase.description}
              </p>
            </motion.div>

        ))}
      </div>
    </section>
  );
};

export default ScrollUseCases;
