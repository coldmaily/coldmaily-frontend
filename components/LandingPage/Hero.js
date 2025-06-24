"use client";
import FadeInSection from "../animations/FadeInSection";
import AnimatedSubtext from "../animations/AnimatedSubtext"; // Import the new component
import { FaBullseye, FaCalendarAlt, FaPenFancy, FaSyncAlt, FaHandshake, FaBriefcase, FaBullhorn, FaRocket } from "react-icons/fa";
import FeatureSection from "./featuresection";
import HomeSection from "./homesection";
import ScrollUseCases from "./UseCaseCarousel";
import StatsSection from "./statsection";

const Hero = () => {
  return (
    <>
    <HomeSection/>
    <FeatureSection/>
    {/* <StatsSection/> */}
    <ScrollUseCases/>
    </>
  );
};

export default Hero;
