import React from "react";
import FadeInSection from "../animations/FadeInSection";
import AnimatedSubtext from "../animations/AnimatedSubtext";
import { redirectToGoogleLogin } from "@/libapi/api";

const HomeSection = () => {
  return (
    <section className="flex flex-col items-center text-center bg-gradient-to-b from-gray-900 to-black text-white min-h-screen pt-24 px-6">
      
      {/* Main Headline */}
      <FadeInSection direction="up">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
          Revolutionizing Cold Emails with AI Automation
        </h1>
      </FadeInSection>

      {/* Animated Subtext - Now in Separate Component */}
      <AnimatedSubtext />

      {/* CTA Button */}
      <div className="mb-16">
        <button onClick={redirectToGoogleLogin} className="px-6 py-3 cursor-pointer bg-[#D5D5D5] text-[#101828] text-lg font-semibold rounded-lg transition-all hover:bg-white">
          Start Cold Mailing
        </button>
      </div>

      {/* Why ColdMaily? - Directly Below */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 md:px-12 gap-50 mt-15">
        
        {/* Left Side - Image */}
        <FadeInSection direction="left" delay={0.4} className="w-full md:w-2/5 flex justify-center mr-15">
          <img 
            className="max-w-sm md:max-w-md md:h-66 rounded-lg"
            src="/coldmaily_logo.jpeg" // Replace with actual image
            alt="ColdMaily Automation"
          />
        </FadeInSection>

        {/* Right Side - Title & Description */}
        <FadeInSection direction="right" delay={0.8} className="w-full md:w-3/5 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Why ColdMaily?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Cold emails are easy. <strong>Getting replies? That’s the challenge.</strong>  
            <br /><br />
            ColdMaily <span className="text-blue-400 font-semibold">automates your cold email follow-ups</span> with AI-powered scheduling. No more manual tracking, no missed opportunities—just higher conversions with smarter outreach.
          </p>
        </FadeInSection>

      </div>
    </section>
  );
};

export default HomeSection;
