// components/LandingPage/featuresection.js

import React from "react";
import { FaRobot, FaUserCheck, FaChartLine, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import Box from "../Cards/box";
import { getFeatureBoxVariant } from "../animations/featureAnimations"; // Correct Import

const FeatureSection = () => {
  return (
    <section className="w-full py-20 bg-gray-100 flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
      
      {/* Left Section - Title & Description */}
      <div className="md:w-2/5 text-left">
        <h2 className="text-4xl font-bold text-gray-900">Why Use Cold Emails?</h2>
        <p className="text-lg text-gray-600 mt-4">
          Cold emails help businesses reach potential customers, close deals, and grow rapidly 
          without spending huge budgets on ads. Personalization & automation make them even better!
        </p>
      </div>

      {/* Right Section - Grid of Cards */}
      <div className="md:w-3/5 grid grid-cols-2 gap-6 relative pl-20">
        <div className="flex flex-col space-y-6">
          <motion.div 
            className="group"
            {...getFeatureBoxVariant(0)}
          >
            <Box
              icon={FaRobot}
              title="Automated Follow-Ups"
              description="Schedule and send automated follow-ups to maximize responses."
              extraClasses="mt-12"
            />
          </motion.div>

          <motion.div 
            className="group"
            {...getFeatureBoxVariant(0.2)}
          >
            <Box
              icon={FaUserCheck}
              title="Smart Personalization"
              description="Customize emails for better engagement and trust."
            />
          </motion.div>
        </div>

        <div className="flex flex-col space-y-6">
          <motion.div 
            className="group"
            {...getFeatureBoxVariant(0.4)}
          >
            <Box
              icon={FaChartLine}
              title="Higher Conversion Rates"
              description="Boost response rates with AI-optimized cold emails."
            />
          </motion.div>

          <motion.div 
            className="group"
            {...getFeatureBoxVariant(0.6)}
          >
            <Box
              icon={FaBrain}
              title="AI-Driven Insights"
              description="Analyze and improve your outreach strategy with AI insights."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
